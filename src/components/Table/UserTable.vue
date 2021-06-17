<template>
  <table
    cellpadding="20"
    cellspacing="0"
    border="0"
    :filterData="filterData"
    @click="filterUsers"
  >
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
      <tr v-for="(user, idx) in filteredUsers.slice(0, rowValue)" :key="idx">
        <td>
          <div class="round">
            <input type="checkbox" :id="`${idx}`" :checked="checkAll" />
            <label :for="`${idx}`"></label>
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
          regDate: "Май 10, 2021",
          lastActivity: "Май 10, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User2",
          email: "user2@user.com",
          regDate: "Март 10, 2021",
          lastActivity: "Июнь 02, 2021",
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
          regDate: "Февраль 10, 2021",
          lastActivity: "Май 11, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User5",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 12, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User6",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 16, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User7",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 10, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User8",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 09, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User9",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 15, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User10",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 17, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User11",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Май 20, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User12",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Май 10, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
        {
          name: "User13",
          email: "user@user.com",
          regDate: "Февраль 10, 2020",
          lastActivity: "Июнь 01, 2021",
          lastAction: "view_landing_course1",
          product: "Как наладить отнош",
        },
      ],
      filteredUsers: [],
      month: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
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
      this.filteredUsers.splice(idx, 1);
    },
  },
  watch: {
    filterData(filter) {
      let data1;
      let data2;
      this.filteredUsers = [];

      if (filter.length === 3) {
        data1 =
          filter[2] +
          "-" +
          (this.month.indexOf(filter[1]) + 1) +
          "-" +
          filter[0];
        for (let i = 0; i < this.users.length; i++) {
          let d = this.users[i].lastActivity.substring(
            this.users[i].lastActivity.length - 8,
            this.users[i].lastActivity.length - 6
          );
          let y = this.users[i].lastActivity.substring(
            this.users[i].lastActivity.length - 4
          );
          let m = String(
            this.month.indexOf(this.users[i].lastActivity.split(" ")[0]) + 1
          );
          let data3 = y + "-" + m + "-" + d;
          if (data3 === data1) {
            this.filteredUsers.push(this.users[i]);
          }
        }
      } else {
        data1 =
          filter[4] +
          "-" +
          (this.month.indexOf(filter[2]) + 1) +
          "-" +
          filter[0];
        data2 =
          filter[4] +
          "-" +
          (this.month.indexOf(filter[3]) + 1) +
          "-" +
          filter[1];
      }
      for (let i = 0; i < this.users.length; i++) {
        let d = this.users[i].lastActivity.substring(
          this.users[i].lastActivity.length - 8,
          this.users[i].lastActivity.length - 6
        );
        let y = this.users[i].lastActivity.substring(
          this.users[i].lastActivity.length - 4
        );
        let m =
          this.month.indexOf(this.users[i].lastActivity.split(" ")[0]) + 1;
        let data3 = y + "-" + m + "-" + d;
        if (data1 <= data3 && data3 <= data2) {
          this.filteredUsers.push(this.users[i]);
        }
      }

      if (filter.length === 0) {
        this.filteredUsers = [...this.users];
      }
    },
  },
  created() {
    this.filteredUsers = [...this.users];
  },
};
</script>

<style src="./UserTable.css" scoped>
</style>