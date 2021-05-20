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

export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchValue: null,
    };
  },
  methods: {
    changeSearch() {
      this.$emit("changeSearch", this.searchValue);
    },
  },
};
</script>

<style scoped src="./SearchElement.css">
</style>