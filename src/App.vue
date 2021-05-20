<template>
  <div id="wrapper">
    <search-element @changeSearch="changeSearch" />
    <cards :search="search" />
  </div>
</template>

<script>
import SearchElement from "./components/SearchElement.vue";
import Cards from "./components/Cards.vue";

export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  components: {
    SearchElement,
    Cards,
  },
  methods: {
    changeSearch: function (text) {
      this.search = text;
    },
  },
};
</script>

<style src="./App.css">
</style>
