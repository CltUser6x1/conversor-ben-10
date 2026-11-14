import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const formatNumber = (value) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function HomeView({
  amount,
  setAmount,
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
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.topBar}>
              <View style={styles.omnitrixRing}>
                <View style={styles.omnitrixInner} />
              </View>
              <Text style={styles.badge}>OMNITRIX</Text>
            </View>

            <Text style={styles.title}>Conversor de moedas</Text>
            <Text style={styles.subtitle}>
              Escolha as moedas e informe o valor que deseja converter.
            </Text>

            <View style={styles.card}>
              <Text style={styles.label}>Valor</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="Ex.: 676767,67"
                placeholderTextColor="#96b8c6"
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                accessibilityLabel="Valor para converter"
              />
              <Text style={styles.helper}>Aceita vírgula ou ponto como separador decimal.</Text>

              <View style={styles.pickerGroup}>
                <Text style={styles.label}>De</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={fromCurrency}
                    onValueChange={setFromCurrency}
                    style={styles.picker}
                    enabled={!loading && !loadingCurrencies && currencies.length > 0}
                    dropdownIconColor="#7ef9ff"
                  >
                    {currencies.length > 0 ? (
                      currencies.map((currency) => (
                        <Picker.Item
                          key={currency.code}
                          label={`${currency.code} — ${currency.name}`}
                          value={currency.code}
                          color={Platform.OS === 'android' ? '#07141f' : '#eafcff'}
                        />
                      ))
                    ) : (
                      <Picker.Item
                        label={loadingCurrencies ? 'Carregando moedas...' : 'Moedas indisponíveis'}
                        value=""
                        enabled={false}
                        color={Platform.OS === 'android' ? '#07141f' : '#eafcff'}
                      />
                    )}
                  </Picker>
                </View>
              </View>

              <View style={styles.pickerGroup}>
                <Text style={styles.label}>Para</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={toCurrency}
                    onValueChange={setToCurrency}
                    style={styles.picker}
                    enabled={!loading && !loadingCurrencies && currencies.length > 0}
                    dropdownIconColor="#7ef9ff"
                  >
                    {currencies.length > 0 ? (
                      currencies.map((currency) => (
                        <Picker.Item
                          key={currency.code}
                          label={`${currency.code} — ${currency.name}`}
                          value={currency.code}
                          color={Platform.OS === 'android' ? '#07141f' : '#eafcff'}
                        />
                      ))
                    ) : (
                      <Picker.Item
                        label={loadingCurrencies ? 'Carregando moedas...' : 'Moedas indisponíveis'}
                        value=""
                        enabled={false}
                        color={Platform.OS === 'android' ? '#07141f' : '#eafcff'}
                      />
                    )}
                  </Picker>
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, loading && styles.buttonDisabled]}
                onPress={convert}
                disabled={loading || loadingCurrencies || currencies.length === 0}
              >
                {loading ? (
                  <ActivityIndicator color="#03131f" />
                ) : (
                  <Text style={styles.buttonText}>Converter</Text>
                )}
              </Pressable>

              {!!error && <Text style={styles.error}>{error}</Text>}
            </View>

            {result && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Resultado</Text>
                <Text style={styles.resultNumber}>
                  {formatNumber(result.converted)} {result.to}
                </Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Taxa usada</Text>
                  <Text style={styles.detailValue}>
                    1 {result.from} = {formatNumber(result.rate)} {result.to}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Data da cotação</Text>
                  <Text style={styles.detailValue}>{result.date}</Text>
                </View>
                <Pressable onPress={clear} style={styles.clearButton}>
                  <Text style={styles.clearText}>Limpar valor</Text>
                </Pressable>
              </View>
            )}

            <Text style={styles.footer}>
              As taxas são referências publicadas pela Frankfurter e podem não corresponder ao valor praticado por bancos ou casas de câmbio.
            </Text>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#07141f',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 45,
    paddingBottom: 48,
    alignItems: 'center',
    backgroundColor: '#07141f',
  },
  content: {
    width: '100%',
    maxWidth: 640,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  omnitrixRing: {
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#7ef9ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7ef9ff',
    shadowOpacity: 0.85,
    shadowRadius: 18,
    elevation: 8,
  },
  omnitrixInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#07141f',
  },
  badge: {
    color: '#7ef9ff',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f4fbff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: '#7ef9ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#a7dce8',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#0e2233',
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: '#5ee2c3',
    shadowColor: '#5ee2c3',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 10,
  },
  label: {
    color: '#d9f8ff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0b1824',
    borderWidth: 1,
    borderColor: '#2faec7',
    borderRadius: 12,
    color: '#f2fbff',
    fontSize: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#7ef9ff',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  helper: {
    color: '#8ac4d8',
    fontSize: 12,
    marginTop: 7,
  },
  pickerGroup: {
    marginTop: 18,
  },
  pickerWrap: {
    backgroundColor: '#0b1824',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2faec7',
    overflow: 'hidden',
  },
  picker: {
    color: '#f2fbff',
    backgroundColor: '#0b1824',
    height: 52,
    ...(Platform.OS === 'web' ? { colorScheme: 'dark' } : {}),
  },
  button: {
    backgroundColor: '#69f0c7',
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#69f0c7',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#061722',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  error: {
    color: '#ffb7b7',
    marginTop: 14,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#0f2b3d',
    borderRadius: 18,
    padding: 22,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#7ef9ff',
    shadowColor: '#7ef9ff',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  resultLabel: {
    color: '#a8dffd',
    fontSize: 14,
    fontWeight: '700',
  },
  resultNumber: {
    color: '#f0fcff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
  detailLabel: {
    color: '#95d0e2',
    fontSize: 13,
    flex: 1,
  },
  detailValue: {
    color: '#f6fdff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    flex: 1,
  },
  clearButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  clearText: {
    color: '#7ef9ff',
    fontWeight: '700',
    fontSize: 14,
  },
  footer: {
    color: '#9fc5d1',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
  },
});
