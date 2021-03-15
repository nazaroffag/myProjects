// в этом файле прописывается вся логика получения внешних данных различными способами и во vue-компонент передаем уже результаты работы этого файла

// если требуется апи-ключ от внешней апишки
const API_KEY =
  "b90e5cc4bef5c9ad1aaadf78fb5c9af9098896ed0b247b8565952c9a20e57d85";
// при конструировании строки запроса лучше использовать URLSearchParams, а не собирать ее из кусочков, как ниже
// tickers преобразовываем в строку, разделенную запятой
// затем преобразовываем данные, чтобы избежать возврата данных, разделенных на 1
export const loadTickers = tickers =>
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(
      ","
    )}&tsyms=USD&api_key=${API_KEY}`
  )
    .then(r => r.json())
    .then(rawData =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      )
    );

// Object.entries из объекта {a:1, b:2} вернет объект {['a':1],['b':2]}, а затем с помощью map это преобразовывается в такой же массив, в котором value => 1/value, а затем с помощью fromEntries возвращает это обратно
