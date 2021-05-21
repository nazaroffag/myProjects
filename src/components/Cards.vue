<template>
  <div>
    <div v-if="cards" id="pages__wrapper">
      <div class="pages__wrapper__fixer">
        <div class="pages__arrow" v-if="page > 1" v-on:click="page = page - 1">
          <left-arrow />
        </div>
      </div>
      <div class="pages__wrapper__fixer">
        <div v-if="cards ? cards.length > 0 : false" class="page">
          {{ page }}
        </div>
      </div>
      <div class="pages__wrapper__fixer">
        <div
          class="pages__arrow"
          v-if="hasNextPage"
          v-on:click="page = page + 1"
        >
          <right-arrow />
        </div>
      </div>
    </div>

    <div id="cards__wrapper" :style="!cards ? 'height: 100vh' : 'height: auto'">
      <div v-if="!show" class="loader"></div>

      <div
        :search="search"
        v-for="card in paginatedPages"
        :key="card"
        class="card__wrapper"
      >
        <h3 class="card__header">{{ card.title }}</h3>
        <p class="card__text">{{ card.body }}</p>
        <h5 class="card__author">{{ card.name }}</h5>
      </div>

      <div
        v-if="(cards ? cards.length === 0 : false) && (show ? true : false)"
        id="cards__noResults"
      >
        No match found
      </div>
    </div>
  </div>
</template>

//? [х] изменить число карточек на экране в зависимости от его размера
//? [x] тогда убрать стрелку вверх
//? [ ] отобразить в строке браузера Users
//? [x] сделать сэйв в LocalStorage
//? [ ] сделать загрузку из LS фильтра при запуске
//? [x] поправить верстку на последней page

<script>
import LeftArrow from "../assets/LeftArrow.vue";
import RightArrow from "../assets/RightArrow.vue";
import { loadDataFromLocalStorage } from "./LocalStorage.js";

export default {
  components: {
    LeftArrow,
    RightArrow,
  },
  data() {
    return {
      cards: [],
      cardsMain: [],
      page: 1,
      show: false,
      cardsAmount: 3,
      pageWidth: null,
    };
  },
  props: {
    search: {
      type: String,
      required: false,
      default: function () {
        let filterData = loadDataFromLocalStorage;
        if (filterData) {
          return filterData;
        } else return "";
      },
    },
  },
  created() {
    setTimeout(async () => {
      this.show = false;
      const p = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const u = await fetch("http://jsonplaceholder.typicode.com/users");
      const users = await u.json();
      const posts = await p.json();
      let cards = [...posts];
      for (let i = 0; i < posts.length; i++) {
        for (let y = 0; y < users.length; y++) {
          if (users[y].id === posts[i].userId) {
            cards[i].name = users[y].name;
          }
        }
      }
      this.cardsMain = [...cards];
      this.show = true;
      return (this.cards = [...cards]);
    }, 10);

    this.pageWidth = this.checkPageWidth;
    this.countCardsAmount();
    console.log(this.search);
  },
  methods: {
    filterCards(word) {
      if (word === "") {
        this.cards = [...this.cardsMain];
      }
      this.cards = null;
      this.cards = this.filteredCards;
    },
    countCardsAmount() {
      if (this.pageWidth <= 400 && this.pageHeight <= 700) {
        this.cardsAmount = 3;
      } else if (this.pageWidth > 401 && this.pageWidth <= 500) {
        this.cardsAmount = 4;
      } else if (this.pageWidth > 501 && this.pageWidth <= 699) {
        this.cardsAmount = 6;
      } else if (this.pageWidth > 700 && this.pageWidth <= 1000) {
        this.cardsAmount = 9;
      } else if (this.pageWidth > 1000) {
        this.cardsAmount = 12;
      }
    },
  },
  watch: {
    search: {
      handler() {
        this.page = 1;
        this.filterCards(this.search);
      },
    },
  },
  computed: {
    checkPageWidth() {
      return window.innerWidth;
    },
    filteredCards() {
      return Object.values(this.cardsMain).filter((card) =>
        card.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    pages() {
      return Math.round(this.cards.length / this.cardsAmount);
    },
    paginatedPages() {
      return this.cards.slice(this.startIndex, this.endIndex);
    },
    startIndex() {
      return (this.page - 1) * this.cardsAmount;
    },
    endIndex() {
      return this.page * this.cardsAmount;
    },
    hasNextPage() {
      return this.cards.length > this.endIndex;
    },
  },
};
</script>

<style scoped src="./Cards.css">
</style>