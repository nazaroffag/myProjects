import { createRouter, createWebHistory } from "vue-router";
import UserList from "../components/UserList.vue";
import UserPage from "../components/UserPage.vue";

const routes = [
  {
    path: "/",
    name: "User List",
    component: UserList,
  },
  {
    path: "/user_page",
    name: "User Page",
    component: UserPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
