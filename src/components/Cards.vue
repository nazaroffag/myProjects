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
        v-if="cards ? cards.length > 0 : false"
        id="cards__arrow"
        @click="moveToSearch"
      >
        <top-arrow />
      </div>

      <div
        v-if="(cards ? cards.length === 0 : false) && (show ? true : false)"
        id="cards__noResults"
      >
        No match found
      </div>
    </div>

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
          @click="moveToSearch"
        >
          <right-arrow />
        </div>
      </div>
    </div>
  </div>
</template>

//? [ ] изменить число карточек на экране в зависимости от его размера
//? [ ] тогда убрать стрелку вверх
//? [ ] отобразить в строке браузера Users
//? [ ] сделать сэйв в LocalStorage
//? [ ] убрать загрузку в отдельный API
//? [ ] поправить верстку на последней page

<script>
import TopArrow from "../assets/TopArrow.vue";
import LeftArrow from "../assets/LeftArrow.vue";
import RightArrow from "../assets/RightArrow.vue";

export default {
  components: {
    TopArrow,
    LeftArrow,
    RightArrow,
  },
  data() {
    return {
      cards: [],
      cardsMain: [],
      page: 1,
      show: false,
    };
  },
  props: {
    search: {
      type: String,
      required: false,
      default: "",
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
    }, 100);
  },
  methods: {
    filterCards(word) {
      if (word === "") {
        this.cards = [...this.cardsMain];
      }
      this.cards = null;
      this.cards = this.filteredCards;
    },
    moveToSearch() {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        left: 0,
      });
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
    filteredCards() {
      return Object.values(this.cardsMain).filter((card) =>
        card.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    pages() {
      return Math.round(this.cards.length / 6);
    },
    paginatedPages() {
      return this.cards.slice(this.startIndex, this.endIndex);
    },
    // расчет стартовой страницы фильтра
    startIndex() {
      return (this.page - 1) * 6;
    },

    // расчет последней страницы фильтра
    endIndex() {
      return this.page * 6;
    },
    hasNextPage() {
      return this.cards.length > this.endIndex;
    },
  },
};
</script>

<style scoped src="./Cards.css">
</style>