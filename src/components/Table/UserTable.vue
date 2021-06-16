<template>
  <table cellpadding="20" cellspacing="0" border="0" :filterData="filterData">
    <thead>
      <tr>
        <td>
          <div class="round">
            <input type="checkbox" id="checkbox" v-model="checkAll" />
            <label for="checkbox"></label>
          </div>
        </td>
        <td>Пользователь</td>
        <td>Дата регистрации</td>
        <td>Последняя активность</td>
        <td>Последнее действие</td>
        <td>Продукт</td>
        <td id="showCol">
          Отобразить
          <select id="rowValue" v-model="rowValue">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, idx) in paginatedUsers" :key="idx">
        <td>
          <div class="round">
            <input type="checkbox" :id="`${user}`" :checked="checkAll" />
            <label :for="`${user}`"></label>
          </div>
        </td>
        <td>
          <div class="cell-wrapper">
            <div>
              <img
                src="../../assets/lockIcon.svg"
                alt="lock"
                :class="{ active: idx === edit }"
              />
              {{ user.name }}
            </div>
            <span>{{ user.email }}</span>
          </div>
        </td>
        <td :class="{ grey: idx === edit }">{{ user.regDate }}</td>
        <td :class="{ grey: idx === edit }">{{ user.lastActivity }}</td>
        <td class="shadow-text" :class="{ grey: idx === edit }">
          {{ user.lastAction }}
        </td>
        <td class="shadow-text" :class="{ grey: idx === edit }">
          {{ user.product }}
        </td>
        <td>
          <pencil-icon class="table-icons" @click="editUser(idx)" />
          <trash-icon class="table-icons" @click="deleteUser(idx)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PencilIcon from "../../assets/pencil.vue";
import TrashIcon from "../../assets/trash.vue";

export default {
  components: {
    PencilIcon,
    TrashIcon,
  },
  props: {
    filterData: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      users: [
        {
          name: "User1",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User2",
          email: "user2@user.com",
          regDate: "Март 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User3",
          email: "user3@user.com",
          regDate: "Май 10, 2021",
          lastActivity: "Июнь 10, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User4",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июль 10, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User5",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Август 10, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User6",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User7",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User8",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User9",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User10",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User11",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User12",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User13",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Февраль 10, 2020",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
      ],
      rowValue: 15,
      checkAll: false,
      edit: null,
    };
  },
  methods: {
    editUser(user) {
      this.edit === user ? (this.edit = null) : (this.edit = user);
    },
    deleteUser(idx) {
      this.users.splice(idx, 1);
    },
    showFilter() {
      let data1 =
        this.filterData[2] +
        " " +
        this.filterData[0] +
        ", " +
        this.filterData[4];
      let data2 =
        this.filterData[3] +
        " " +
        this.filterData[1] +
        ", " +
        this.filterData[4];
      console.log(data1, data2);
    },
  },

  computed: {
    paginatedUsers() {
      return this.users.slice(0, this.rowValue);
    },
  },
};
</script>

<style src="./UserTable.css" scoped>
</style>