<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <!-- прелоадер -->
    <div
      v-if="!tList"
      class="fixed w-100 h-100 opacity-80 bg-blue-500 inset-0 z-50 flex items-center justify-center"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <!-- основной контейнер приложения -->
    <div v-if="tList" class="container">
      <div class="w-full my-4"></div>

      <!-- инпут Тикер -->
      <section>
        <div class="flex flex-col">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700"
              >Тикер</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                type="text"
                name="wallet"
                id="wallet"
                v-model="ticker"
                v-on:keydown="check"
                v-on:keydown.enter="addTicker"
                v-on:keyup="searchTicker"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
                autocomplete="off"
              />
            </div>
            <div
              v-if="tickPop.length"
              class="flex border-b-2 border-gray-600 mt-4 mb-2 pb-4"
            >
              <div
                v-for="(tick, idx) in tickPop"
                v-bind:key="idx"
                v-on:click.stop="addToInpt(tick)"
                class="text-gray-700 bg-gray-400 rounded-lg px-3 cursor-pointer mr-2"
              >
                {{ tick }}
              </div>
            </div>
            <div v-if="tickerCheck" class="text-red-700">
              Такой тикер уже добавлен
            </div>
          </div>
        </div>

        <!-- кнопка Добавить -->

        <button
          v-on:click="addTicker"
          type="button"
          class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <!-- Heroicon name: solid/mail -->
          <svg
            class="-ml-0.5 mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path
              d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            ></path>
          </svg>
          Добавить
        </button>
      </section>

      <!-- зона вывода тикеров + график -->

      <template v-if="tickers.length">
        <!-- Фильтр и переключение между страницами -->

        <p class="flex flex-row">
          <input
            type="text"
            v-model="filter"
            class="block w-25 mr-2 pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Фильтр тикеров"
            autocomplete="off"
          />
          <button
            v-if="page > 1"
            v-on:click="page = page - 1"
            class="inline-flex items-center px-4 border border-transparent shadow-sm text-sm leading-2 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2"
          >
            Назад
          </button>
          <button
            v-if="hasNextPage"
            v-on:click="page = page + 1"
            class="inline-flex items-center px-4 border border-transparent shadow-sm text-sm leading-2 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Вперед
          </button>
        </p>

        <hr class="w-full border-t border-gray-600 my-4" />

        <!-- зона вывода тикеров -->

        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <!-- тикер -->
          <!--  запись v-bind:class="selectedTicker == t ? 'border-4' : ''"   аналогична  'border-4' : selectedTicker == t  -->
          <!-- присвоить класс border-4, если selectedTicker равно t -->

          <div
            v-for="(t, idx) in paginatedTickers"
            v-bind:key="t.name"
            v-on:click="select(t)"
            v-bind:class="{ 'border-4': selectedTicker == t }"
            class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
          >
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ t.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ t.price }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
              v-on:click.stop="delTicker(idx)"
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path></svg
              >Удалить
            </button>
          </div>
        </dl>

        <hr class="w-full border-t border-gray-600 my-4" />

        <!-- график -->

        <section v-if="selectedTicker" class="relative">
          <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
            {{ selectedTicker.name }} - USD
          </h3>
          <div class="flex items-end border-gray-600 border-b border-l h-64">
            <div
              v-for="(bar, idx) in normalizedGraph"
              :key="idx"
              :style="{ height: `${bar}%` }"
              class="bg-purple-800 border w-10"
            ></div>
          </div>
          <button
            v-on:click="selectedTicker = null"
            type="button"
            class="absolute top-0 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
              version="1.1"
              width="30"
              height="30"
              x="0"
              y="0"
              viewBox="0 0 511.76 511.76"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                  fill="#718096"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </button>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import { loadTicker } from "./api";

export default {
  name: "App",
  data() {
    return {
      // поле инпута
      ticker: null,
      // массив тикеров из инпута или локал сторадж
      tickers: [],
      // текущий, выбранный тикер для запроса значений и отображения графика
      selectedTicker: null,
      // массив значений для графика
      graph: [],
      // проверка на уникальность введенного тикера в инпут
      tickerCheck: false,
      // массив тикеров в автокомплите
      tickPop: [],
      // ??????
      setTick: null,
      // переменная для загрузки массива имен тикеров из внешнего АПИ и работы прелоадера до срабатывания фетча
      tList: null,
      // страница фильтра
      page: 1,
      // поле фильтра
      filter: "",
    };
  },
  created() {
    // показываем путь в адресной строке браузера
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );
    if (windowData.filter) {
      this.filter = windowData.filter;
    }
    if (windowData.page) {
      this.page = windowData.page;
    }
    // вместо if можно записать так:
    // Object.assign(this.windowData);

    // загружаем данные из localStorage
    const tickersData = localStorage.getItem("cryptonomicon-list");
    if (tickersData) {
      this.tickers = JSON.parse(tickersData);
    }
    // каждые 5 секунд вызываем метод для обновления тикеров
    setInterval(this.updateTickers, 5000);

    // загружаем список тикеров из API Cryptocompare
    setTimeout(async () => {
      const f = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
      );
      const data = await f.json();
      return (this.tList = data.Data);
    }, 1000);
  },

  // в computed попадают вычисляемые методы, обращение к которым производится не часто, но требует дополнительных вычислений, результаты которых кешируются вью, соответственно это занимает меньше времени и тратит меньше ресурсов. Копмьютеды - это поля, поэтому обращаемся к ним, как к объектам, а не функциям
  // computed не изменяет состояние, но изменяет значение элементов, использующихся в шаблоне
  computed: {
    // расчет стартовой страницы фильтра
    startIndex() {
      return (this.page - 1) * 6;
    },

    // расчет последней страницы фильтра
    endIndex() {
      return this.page * 6;
    },

    // метод, возвращающий список тикеров, удовлетворяющих условию в инпуте фильтра
    filteredTickers() {
      return this.tickers.filter((ticker) =>
        ticker.name.includes(this.filter.toUpperCase())
      );
    },

    // режет их постранично по 6 на странице
    paginatedTickers() {
      return this.filteredTickers.slice(this.startIndex, this.endIndex);
    },

    // определяем, есть ли еще страница фильтра
    hasNextPage() {
      return this.filteredTickers.length > this.endIndex;
    },

    // нормализация графика, чтобы он не выскакивал за границы при отрисовке
    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      if (maxValue == minValue) {
        return this.graph.map(() => 50);
      }
      return this.graph.map(
        (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },

    // определяем текущее состояние фильтра и страницы
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page,
      };
    },
  },

  // здесь указывается логика, срабатывающая при выполнении действий. Нажал -> сработало
  methods: {
    // скрытие предупреждения о дублировании тикера
    check() {
      this.tickerCheck = false;
    },

    // ищем тикер в списке, загруженом из АПИ
    searchTicker() {
      this.tickPop = [];
      const abjArr = Object.keys(this.tList);

      if (this.ticker) {
        for (let i = 0; i < abjArr.length; i++) {
          if (abjArr[i].includes(this.ticker.toUpperCase()) == true) {
            if (this.tickPop.length < 4) {
              this.tickPop.push(abjArr[i].toString());
            }
          }
        }
      }
    },

    // метод, обновляющий тикеры за счет запроса к АПИ по имени тикера
    // массив тикеров пустой, сразу выходим
    // иначе запрос к api.js и изменение массива тикеров с добавлением цены

    async updateTickers() {
      if (!this.tickers.length) {
        return;
      }
      const exchangeData = await loadTicker(this.tickers.map((t) => t.name));
      this.tickers.forEach((ticker) => {
        const price = exchangeData[this.ticker.name.toUpperCase()];
        if (!price) {
          ticker.price = "-";
          return;
        }

        // данная логика не самая красивая, потому что в методах происходит и вычисление и отображение данных
        const normalizedPrice = 1 / price;
        const formattedPrice =
          normalizedPrice > 1
            ? normalizedPrice.toFixed(2)
            : normalizedPrice.toPrecision(2);
        ticker.price = formattedPrice;
      });
    },

    // метод на кнопку Добавить тикер
    addTicker() {
      const newTicker = {
        name: this.ticker.toUpperCase(),
        price: "-",
      };

      // проверяем на пустой инпут
      if (this.ticker) {
        // убираем строку проверку тикера
        this.tickerCheck = false;

        // сравниваем введенное значение с уже имеющимся в массиве
        if (this.tickers.find((t) => t.name === this.ticker.toUpperCase())) {
          // если такое уже есть, чистим инпут и выводим тикерЧек
          this.ticker = "";
          return (this.tickerCheck = true);

          // если такого нет, заводим новый тикер, добавляя туда новый элемент. Push в данном случае не сработает
        } else {
          this.tickers = [...this.tickers, newTicker];
          this.filter = "";
        }
      }
    },

    // удаление тикера
    delTicker(idx) {
      this.tickers.splice(idx, 1);
      if (this.selectedTicker === idx) {
        this.selectedTicker = null;
      }

      // сброс страницы вниз, если это удалился последний тикер на странице (этот переписали в watch, потому что это логика Когда -> То)
      // if (this.paginatedTickers.length == 0 && this.page > 1) {
      //   this.page -=1;
      // };
    },

    // логика выбора тикера
    select(ticker) {
      this.selectedTicker = ticker;
    },

    // метод добавления тикера из автокомплита
    addToInpt(idx) {
      this.ticker = idx;
      this.tickPop = [];
      this.addTicker();
    },
  },

  // при наступлении каких-то условий, делай то-то
  // отслеживает изменение состояния элемента и выполняет действия в watch
  watch: {
    tickers() {
      // сохранение в localStorage при изменении массива выбранных тикеров. Когда меняются тикеры - сохраняется в сторадж
      localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
    },

    // когда изменяется selectedTicker сбрасывается график
    selectedTicker() {
      this.graph = [];
    },

    // сброс страницы вниз, если удалился последний тикер на странице. Когда меняется число тикеров на странице и их число равно 0, сбрасываем страницу ниже
    paginatedTickers() {
      if (this.paginatedTickers.length == 0 && this.page > 1) {
        this.page -= 1;
      }
    },

    // Когда меняется фильтр, сбрасываем страницу на 1
    filter() {
      this.page = 1;
      // const currentURL = new URL(window.location);
    },

    // когда меняются опции в URL, меняется сам URL
    // работа с адресной строкой. Отслеживание изменение переменных filter и page и соответствующее изменение адресной строки браузера
    pageStateOptions(value) {
      this.page = 1;
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${value.filter}&page=${value.page}`
      );
    },
  },
};
</script>

<style src="./app.css"></style>
