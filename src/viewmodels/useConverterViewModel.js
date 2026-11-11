import { useCallback, useEffect, useState } from 'react';
import { convertCurrency, getAvailableCurrencies } from '../models/currencyModel';

function parseAmount(text) {
  const value = String(text).trim().replace(/\s/g, '');

  if (!value) {
    return NaN;
  }

  const lastComma = value.lastIndexOf(',');
  const lastPeriod = value.lastIndexOf('.');
  let normalized = value;

  if (lastComma !== -1 && lastPeriod !== -1) {
    const decimalSeparator = lastComma > lastPeriod ? ',' : '.';
    const thousandsSeparator = decimalSeparator === ',' ? '.' : ',';
    normalized = value.split(thousandsSeparator).join('').replace(decimalSeparator, '.');
  } else {
    normalized = value.replace(',', '.');
  }

  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) {
    return NaN;
  }

  return Number(normalized);
}

export default function useConverterViewModel() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCurrencies, setLoadingCurrencies] = useState(false);
  const [error, setError] = useState('');

  const loadCurrencies = useCallback(async () => {
    setLoadingCurrencies(true);
    setError('');

    try {
      const availableCurrencies = await getAvailableCurrencies();
      setCurrencies(availableCurrencies);

      if (!availableCurrencies.some((currency) => currency.code === fromCurrency)) {
        setFromCurrency('USD');
      }

      if (!availableCurrencies.some((currency) => currency.code === toCurrency)) {
        setToCurrency('BRL');
      }
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as moedas disponíveis.');
    } finally {
      setLoadingCurrencies(false);
    }
  }, []);

  useEffect(() => {
    loadCurrencies();
  }, [loadCurrencies]);

  const updateAmount = useCallback((value) => {
    setAmount(value);
    setResult(null);
    setError('');
  }, []);

  const convert = useCallback(async () => {
    const numericAmount = parseAmount(amount);

    if (!amount.trim()) {
      setError('Informe o valor que deseja converter.');
      setResult(null);
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Digite um valor válido, maior que zero. Ex.: 67 ou 67,67.');
      setResult(null);
      return;
    }

    if (!fromCurrency || !toCurrency) {
      setError('Selecione as moedas de origem e destino.');
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setError('Selecione moedas diferentes para realizar a conversão.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const quote = await convertCurrency({ amount: numericAmount, from: fromCurrency, to: toCurrency });

      setResult({
        amount: quote.amount,
        from: quote.from,
        to: quote.to,
        rate: quote.rate,
        converted: quote.converted,
        date: quote.date,
      });
    } catch (err) {
      setError(err.message || 'Não foi possível realizar a conversão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  const clear = useCallback(() => {
    setAmount('');
    setResult(null);
    setError('');
  }, []);

  return {
    amount,
    setAmount: updateAmount,
    currencies,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    loading,
    loadingCurrencies,
    error,
    convert,
    clear,
  };
}