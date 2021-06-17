<template>
  <div id="top-panel-wrapper">
    <div class="ring">
      <ring-icon />
    </div>
    <div id="user-name">Артем</div>
    <div class="ring">
      <search-icon />
    </div>
    <div id="language">
      <select>
        <option value="ru">RU</option>
        <option value="eng">ENG</option>
      </select>
    </div>
  </div>
</template>



<script>
import RingIcon from "../../assets/ringIcon.vue";
import SearchIcon from "../../assets/searchIcon.vue";

export default {
  components: {
    RingIcon,
    SearchIcon,
  },
};
</script>

<style scoped src="./TopModule.css">
</style>