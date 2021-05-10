<template>
  <div id="user-page__wrapper">
    <router-link to="/" id="user-page__backToUserList"
      >Back to user list</router-link
    >
    <img :src="`${avatar}`" :alt="`${first_name}`" />
    <h2>{{ first_name }} {{ last_name }}</h2>
    <div id="user-page__row">
      <div class="user_page__row__first_column">ID</div>
      <div class="user_page__row__second_column">{{ id }}</div>
    </div>
    <div id="user-page__row">
      <div class="user_page__row__first_column">EMail</div>
      <div class="user_page__row__second_column">{{ email }}</div>
    </div>
    <div id="user-page__row">
      <div class="user_page__row__first_column">Description</div>
      <div class="user_page__row__second_column">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
        quae ea commodi quam? Ipsa laudantium dolorum maxime error asperiores
        veritatis quisquam quibusdam distinctio hic aliquid aperiam aut,
        provident vitae quasi!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    avatar: String,
    first_name: String,
    last_name: String,
    email: String,
    userList: Object,
  },
};
</script>

<style src="./UserPage.css" scoped>
</style>