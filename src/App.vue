<template>
  <div id="wrapper" :style="!cards ? 'height: 100vh' : 'height: auto'">
    <div id="search_input__wrapper">
      <div id="search_input__button">
        <svg
          enable-background="new 0 0 32 32"
          id="Glyph"
          version="1.1"
          viewBox="0 0 32 32"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
            id="XMLID_223_"
          />
        </svg>
      </div>
      <input
        type="text"
        id="search_input__input"
        placeholder="Filter by author..."
        v-model="searchValue"
        @keyup="updateCards"
      />
    </div>
    <div v-if="!cards" class="loader"></div>

    <div id="cards__wrapper">
      <div v-for="(card, idx) in cards" :key="idx" class="card__wrapper">
        <h3 class="card__header">{{ card.title }}</h3>
        <p class="card__text">{{ card.body }}</p>
        <a href="#" class="card__more">Lorem ipsum</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: null,
      cards: this.getCards(),
      cardsMain: {},
    };
  },

  methods: {
    loadCardsFromLocalStorage() {
      let ArrFromLS = JSON.parse(localStorage.getItem("cards"));
      return ArrFromLS;
    },
    saveCardsToLocalStorage(cards) {
      localStorage.setItem("cards", JSON.stringify(cards));
    },
    getCards() {
      if (!this.loadCardsFromLocalStorage()) {
        setTimeout(async () => {
          const f = await fetch(`http://jsonplaceholder.typicode.com/posts`);
          const data = await f.json();
          this.cardsMain = data;
          return (this.cards = data);
        }, 100);
      } else {
        this.cardsMain = this.loadCardsFromLocalStorage();
        return (this.cards = this.loadCardsFromLocalStorage());
      }
    },
    updateCards() {
      let tempArr = this.cardsMain;
      if (this.searchValue === "") {
        this.cards = this.cardsMain;
      }
      this.searchCard(tempArr);
    },
    searchCard(tempArr) {
      this.cards = {};

      for (let i = 0; i < tempArr.length; i++) {
        if (
          tempArr[i].title
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        ) {
          this.cards[i] = tempArr[i];
          window.history.pushState(null, document.title, "/user");
        }
      }
    },
  },
};
</script>

<style src="./App.css">
</style>
