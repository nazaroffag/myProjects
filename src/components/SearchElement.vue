<template>
  <div id="search_input__wrapper">
    <div id="search_input__button">
      <search-icon />
    </div>
    <input
      type="text"
      id="search_input__input"
      placeholder="Filter by author..."
      v-model="searchValue"
      @input="changeSearch"
    />
  </div>
</template>

<script>
import SearchIcon from "../assets/SearchIcon.vue";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "./LocalStorage.js";

export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchValue: null,
    };
  },
  created() {
    let filterData = loadDataFromLocalStorage;
    if (filterData) {
      this.searchValue = filterData;
      this.$emit("changeSearch", this.searchValue);
    } else this.searchValue = "";
  },
  methods: {
    changeSearch() {
      saveDataToLocalStorage(this.searchValue);
      this.$emit("changeSearch", this.searchValue);
    },
  },
};
</script>

<style scoped src="./SearchElement.css">
</style>