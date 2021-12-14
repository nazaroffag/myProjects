<template>
  <div class="wrapper">
    <div class="search">
      <input
        type="text"
        class="search__input"
        v-model="search"
        placeholder="Введите имя"
      />
      <div v-if="showPreloader" class="search__preloader">
        <img src="./assets/preloader.svg" alt="preloader" />
      </div>

      <div class="search__results">
        <div
          v-for="(item, index) in searchResults"
          :key="index"
          class="search__result"
        >
          <div class="search__result__title search__result__title___w50">
            {{ item.value }}
          </div>
          <button class="search__result__button" @click="addCard(item)">
            Добавить
          </button>
        </div>
      </div>
      <button class="search__button" @click="stopSearch = !stopSearch">
        {{ stopButtonName }}
      </button>
    </div>
    <div v-if="addedCards.length" class="added-cards">
      <div class="added-cards__title">Список добавленных элементов:</div>
      <div
        v-for="(item, index) in addedCards"
        :key="index"
        class="added-card search__result__title"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    data() {
      return {
        search: null,
        searchResults: {},
        stopSearch: false,
        stopButtonName: "Остановить автопоиск",
        addedCards: [],
        showPreloader: false,
      };
    },
    watch: {
      search() {
        this.search.length === 0
          ? (this.searchResults = {})
          : this.search.length > 2
          ? this.find()
          : "";
      },
      stopSearch() {
        !this.stopSearch
          ? (this.stopButtonName = "Остановить автопоиск")
          : (this.stopButtonName = "Включить автопоиск");
      },
    },
    methods: {
      async find() {
        // Метод не связан напрямую с визуалицией, можно вынести в отдельный модуль, учитывая небольшие размеры компонента, не стал этого делать
        if (this.stopSearch) {
          return false;
        }
        this.showPreloader = true;
        const URL =
          "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
        const TOKEN = "43b7e62f8b5e35438a657ce267979f961dcb9670";
        let query = `${this.search}`;

        const OPTIONS = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token " + TOKEN,
          },
          body: JSON.stringify({ query: query }),
        };

        this.searchResults = await fetch(URL, OPTIONS)
          .then((response) => response.json())
          .then((result) => {
            return result.suggestions;
          })
          .catch((error) => console.log("error", error));
        this.showPreloader = false;
      },
      addCard(item) {
        this.addedCards.push(item);
        console.log(item);
      },
    },
  };
</script>

<style scoped>
  /* Стили по БЭМ, не стал добавлять scss для ускорения  */

  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

  .wrapper {
    width: 279px;
    display: flex;
    flex-direction: column;
  }
  .search {
    width: 100%;
    height: 383px;
    background: #c4c4c4;
    box-sizing: border-box;
    position: relative;
  }
  .search__input {
    width: 100%;
    height: 53px;
    background: #ffffff;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    align-items: center;
    color: #000000;
    padding-left: 16px;
    outline: none;
  }
  .search__preloader {
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 3;
    top: 6px;
    right: 13px;
  }
  .search__preloader > img {
    width: 100%;
    height: 100%;
  }
  .search__input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  .search__input::-moz-placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
  .search__button {
    width: 100%;
    height: 64px;
    background: #7382cd;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .search__results {
    width: 100%;
    height: calc(100% - 64px - 53px);
    box-sizing: border-box;
    overflow-y: auto;
    padding-top: 24px;
  }
  .search__results::-webkit-scrollbar {
    width: 0px;
  }
  .search__result {
    background: #ffffff;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    height: 53px;
    width: 90%;
    padding-left: 16px;
    display: flex;
    align-items: center;
  }
  .search__result__title {
    overflow: hidden;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #000000;
  }
  .search__result__title___w50 {
    width: 50%;
  }
  .search__result__button {
    width: 104px;
    height: 35px;
    background: #40b159;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .added-cards {
    width: 100%;
    margin-top: 13px;
  }
  .added-cards__title {
    width: 100%;
    height: 26px;
    background: #c4c4c4;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #000000;
    padding-left: 16px;
    box-sizing: border-box;
  }
  .added-card {
    width: 100%;
    height: 53px;
    background: #ffffff;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
</style>
