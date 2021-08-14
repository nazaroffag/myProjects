const API_KEY =
  "137468943d05b8e49b5f34aa890406f2f778f6bb8b32356d254807576e135d7e";

const tickersHandlers = new Map(); // {}

//TODO: refactor to use URLSearchParams
const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys(),
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );

      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach((fn) => fn(newPrice));
      });
    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;

// получить стоимость криптовалютных пар с АПИшки?
// получать ОБНОВЛЕНИЯ стоимости криптовалютных пар с АПИШки

// загрузка списка тикеров для автокомплита
// export const getCoinList = async () => {
//   const f = await fetch(
//     `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
//   );
//   const data = await f.json();
//   return data.Data;
// };
