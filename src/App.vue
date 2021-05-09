<template>
  <div>
    <custom-range
      id="range-wrapper"
      :percent="percent"
      @changeValue="displayValue"
    />
    <user-list />
  </div>
</template>

<script>
import CustomRange from "./components/CustomRange.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "App",
  components: {
    CustomRange,
    UserList,
  },
  data() {
    return {
      percent: 34.5,
    };
  },
  methods: {
    displayValue(text) {
      console.log(text);
    },
  },
};
</script>

<style src="./App.css">
</style>
