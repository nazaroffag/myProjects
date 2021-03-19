/* eslint-disable */
// в этом файле прописывается вся логика получения внешних данных различными способами и во vue-компонент передаем уже результаты работы этого файла

// если требуется апи-ключ от внешней апишки
const API_KEY =
  "b90e5cc4bef5c9ad1aaadf78fb5c9af9098896ed0b247b8565952c9a20e57d85";

// здесь хранится список функций, которые надо получить, когда изменился какой-то тикер. Это объект {...}
const tickersHandlers = new Map();

// websocket
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?&api_key=${API_KEY}`
);
// aggregate index из cryptocompare
const AGGREGATE_INDEX = "5";

socket.addEventListener("message", (e) => {
  // console.log(e);
  const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(
    e.data
  );
  if (type !== AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }
  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => fn(newPrice));
});

// отправка на WebSocket. Здесь общий механизм отправки
function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);
  // если сокет открыт, тогда отправляем сообщение
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }
  // иначе открываем и отправляем
  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}
// деталь спецификации к криптобирже. Поэтому вынесена в отдельную функцию
function subscribeToTickerOnWebsocket(ticker) {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}
// отписка от тикера
function unSubscribeFromTickerOnWS(ticker) {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}
// подписка на BTC для кросс-курса
function subscribeToBTConWebsocket(ticker) {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~BTC`],
  });
}
// сама функция-подписчик для кросс-курса BTC
export const subscribeToCrossBTC = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToBTConWebsocket(ticker);
};

// при конструировании строки запроса лучше использовать URLSearchParams, а не собирать ее из кусочков, как ниже
// tickersHandlers преобразовываем в строку, разделенную запятой
// затем преобразовываем данные, чтобы избежать возврата данных, разделенных на 1
//
// export const loadTickers = () => {
//   if (tickersHandlers.size === 0) {
//     return;
//   }
//   fetch(
//     `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
//       ...tickersHandlers.keys(),
//     ].join(",")}&tsyms=USD&api_key=${API_KEY}`
//   )
//     .then((r) => r.json())
//     .then((rawData) => {
//       const updatedPrice = Object.fromEntries(
//         Object.entries(rawData).map(([key, value]) => [key, value.USD])
//       );
//       Object.entries(updatedPrice).forEach(([currency, newPrice]) => {
//         const handlers = tickersHandlers.get(currency) ?? [];
//         handlers.forEach((fn) => fn(newPrice));
//       });
//     });
// };

// Object.entries из объекта {a:1, b:2} вернет объект {['a':1],['b':2]}, а затем с помощью map это преобразовывается в такой же массив, в котором value => 1/value, а затем с помощью fromEntries возвращает это обратно

//  описание функций ниже https://www.youtube.com/watch?v=AzsO67rloQw&list=LL&index=5    58:00
// функция коллбэк - когда ticker обновится, вызови функцию callback
export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWebsocket(ticker);
};

// функция коллбэк, которая позволяет отписаться от функции, навешенной на тикер
// вытягиваем функцию, наешенную на тикер, и оставляем функцию, отличную от коллбэка
// export const unsubscribeFromTicker = (ticker, cb) => {
//   const subscribers = tickersHandlers.get(ticker) || [];
//   tickersHandlers.set(
//     ticker,
//     subscribers.filter((fn) => fn != cb)
//   );
// };

// пока используем этот вариант, когда при удалении тикера удаляется весь тикер месте с вложенными функциями
export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  unSubscribeFromTickerOnWS(ticker);
};
// посмотреть в консоли содержимое переменной
// window.tickers = tickers;

// setInterval(loadTickers, 5000);
