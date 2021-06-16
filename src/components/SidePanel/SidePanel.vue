/* eslint-disable vue/no-unused-components */
<template>
  <div id="top-wrapper">
    <select id="top-category">
      <option value="expert">Эксперт</option>
      <option value="specialist">Специалист</option>
      <option value="novice">Новичок</option>
    </select>
    <bread-icon />
  </div>
  <div id="left-menu">
    <nav class="left-menu-item" v-for="(item, idx) in menu" :key="idx">
      <img :src="getImgUrl(idx)" :alt="`${item}`" />
      <span>{{ item }}</span>
    </nav>
  </div>
</template>

<script>
import BreadIcon from "../../assets/breadIcon.vue";

export default {
  components: {
    BreadIcon,
  },
  data() {
    return {
      menu: {
        analiticsIcon: "Аналитика",
        productIcon: "Продукт",
        usersIcon: "Пользователи",
        constructorIcon: "Констурктор сайта",
        showIcon: "Трансляции",
        messageIcon: "Рассылка",
        marketingIcon: "Маркетинг",
        paymentsIcon: "Платежи",
        optionsIcon: "Настройки",
      },
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../../assets/" + pic + ".svg");
    },
  },
};
</script>

<style src="./SidePanel.css" scoped>
</style>