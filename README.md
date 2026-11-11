# Conversor de moedas

Aplicativo em React Native e Expo para consultar a conversão entre moedas. As cotações vêm da API pública Frankfurter.

## Capturas dos cenários

As imagens mostram as principais telas e respostas do aplicativo.

### Abertura e conversão

| Tela inicial | Carregando as moedas |
| --- | --- |
| ![Tela inicial do conversor](./screenshots/inicio.png) | ![Lista de moedas carregando](./screenshots/carregando-moedas.png) |

| Consultando a cotação | Conversão concluída |
| --- | --- |
| ![Indicador durante a consulta da cotação](./screenshots/carregando-conversao.png) | ![Conversão de USD para BRL com taxa e data](./screenshots/conversor.png) |

### Validação dos dados

| Campo vazio | Valor igual a zero |
| --- | --- |
| ![Mensagem para preencher o valor](./screenshots/campo-vazio.png) | ![Mensagem para valor igual a zero](./screenshots/valor-zero.png) |

| Valor negativo | Moedas iguais |
| --- | --- |
| ![Mensagem para valor negativo](./screenshots/valor-negativo.png) | ![Mensagem ao escolher a mesma moeda](./screenshots/moedas-iguais.png) |

### Falha e novas tentativas

| Falha de conexão | Nova conversão |
| --- | --- |
| ![Mensagem de falha de conexão](./screenshots/falha-conexao.png) | ![Nova conversão de EUR para BRL](./screenshots/nova-conversao.png) |

| Valor limpo |
| --- |
| ![Tela após limpar o valor da conversão](./screenshots/valor-limpo.png) |

## Como executar

Instale o [Node.js](https://nodejs.org/) e, na pasta do projeto, rode:

```bash
npm install
npx expo start
```

Para abrir no navegador:

```bash
npx expo start --web
```

## Sobre as conversões

- A lista de moedas é carregada da API Frankfurter.
- O valor precisa ser maior que zero; números decimais podem ser escritos com vírgula ou ponto.
- A origem e o destino devem ser moedas diferentes.
- O resultado mostra o valor convertido, a taxa usada e a data da cotação.
- Se a consulta falhar, confira a conexão e tente novamente.

As taxas são referências e podem ser diferentes das usadas por bancos e casas de câmbio.

## Organização do código

- `src/models/currencyModel.js` consulta a API e prepara os dados.
- `src/viewmodels/useConverterViewModel.js` valida os valores e controla a conversão.
- `src/views/HomeView.js` contém a tela do aplicativo.
- `App.js` conecta a tela à lógica de conversão.
