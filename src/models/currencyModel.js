const API_BASE = 'https://api.frankfurter.dev/v2';

async function fetchJson(url) {
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`A API Frankfurter respondeu com erro (${response.status}).`);
  }

  return response.json();
}

export async function getAvailableCurrencies() {
  const data = await fetchJson(`${API_BASE}/currencies`);

  if (!Array.isArray(data)) {
    throw new Error('A API retornou uma lista de moedas num formato inválido.');
  }

  const currencies = data
    .filter((currency) => currency.type === 'currency')
    .map((currency) => ({
      code: currency.iso_code,
      name: currency.name,
    }))
    .filter((currency) => currency.code && currency.name)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (currencies.length === 0) {
    throw new Error('A API não retornou moedas disponíveis para conversão.');
  }

  return currencies;
}

export async function convertCurrency({ amount, from, to }) {
  if (!Number.isFinite(amount) || amount <= 0 || !from || !to) {
    throw new Error('Faltam dados para realizar a conversão.');
  }

  const url = `${API_BASE}/rate/${encodeURIComponent(from)}/${encodeURIComponent(to)}`;
  const data = await fetchJson(url);

  if (!data || typeof data.rate !== 'number' || !data.date) {
    throw new Error('A API não retornou uma taxa válida para a conversão solicitada.');
  }

  return {
    amount,
    from,
    to,
    rate: data.rate,
    converted: amount * data.rate,
    date: data.date,
  };
}