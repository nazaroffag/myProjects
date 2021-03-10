// в этом файле прописывается вся логика получения внешних данных различными способами и во vue-компонент передаем уже результаты работы этого файла

// если требуется апи-ключ от внешней апишки
// const API_KEY = "";
// при конструировании строки запроса лечше использовать URLSearchParams, а не собирать ее из кусочков, как ниже
export const loadTicker = (tickerName) => {
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD`
  ).then((r) => r.json());
};
