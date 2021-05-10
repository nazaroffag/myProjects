<template>
  <div>
    <custom-range
      id="range__wrapper"
      :percent="percent"
      @changeValue="displayValue"
    />
    <router-view />
  </div>
</template>

<script>
import CustomRange from "./components/CustomRange.vue";

export default {
  name: "App",
  components: {
    CustomRange,
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
