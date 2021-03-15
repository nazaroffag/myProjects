// в этом файле прописывается вся логика получения внешних данных различными способами и во vue-компонент передаем уже результаты работы этого файла

// если требуется апи-ключ от внешней апишки
const API_KEY =
  "b90e5cc4bef5c9ad1aaadf78fb5c9af9098896ed0b247b8565952c9a20e57d85";
// при конструировании строки запроса лучше использовать URLSearchParams, а не собирать ее из кусочков, как ниже
// tickers преобразовываем в строку, разделенную запятой
export const loadTicker = tickers =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
      ","
    )}&api_key=${API_KEY}`
  ).then(r => r.json());
