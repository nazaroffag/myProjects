<template>
  <main>
    <section>
      <list-item @changeLists="displayLists" />
    </section>
    <section>
      <block-item :lists="lists" />
    </section>
  </main>
</template>

<script>
import ListItem from "./components/LeftPanel/ListItem.vue";
import BlockItem from "./components/RightPanel/ListBlock.vue";

export default {
  name: "App",
  data() {
    return {
      lists: null,
    };
  },
  components: {
    ListItem,
    BlockItem,
  },
  methods: {
    displayLists(arr) {
      this.lists = arr;
      // console.log("App  ", this.lists);
    },
  },
};
</script>

<style src="./App.css">
</style>
