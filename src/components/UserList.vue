<template>
  <div id="userList__wrapper">
    <input
      type="text"
      name="nameInpt"
      id="userList__nameInpt"
      title="Filter by first name"
      placeholder="Enter name..."
      v-model="userName"
      @keyup="updateTable"
    />
    <button @click="clearInp" title="Clear" id="userList__clearInpt">
      <Close />
    </button>
  </div>
  <div v-if="!userList" class="loader"></div>
  <div id="userList__table__wrapper">
    <table cellpadding="5" cellspacing="0" border="1">
      <thead>
        <tr>
          <td>ID</td>
          <td>Avatar</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
        </tr>
      </thead>
      <tbody v-for="(item, idx) in userList" :key="idx">
        <tr>
          <td>{{ item.id }}</td>
          <td class="userList__table__user_photo__wrapper">
            <img
              :src="`${item.avatar}`"
              :alt="`${item.first_name} ${item.last_name}`"
              :title="`${item.first_name} ${item.last_name}`"
              class="userList__table__user_photo"
            />
          </td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td class="userList__table__email">
            {{ item.email }}
            <router-link
              :to="{
                name: 'User Page',
                params: {
                  id: item.id,
                  avatar: item.avatar,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email,
                },
              }"
              title="User info"
              class="userList__table__userInfo"
            >
              <File class="user-list__icon" />
            </router-link>
            <button
              @click="deleteUser(idx)"
              class="userList__table__delete-user"
              title="Delete user"
            >
              <Close />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!emptyList" id="userList__table__no_results">No match found</div>
  </div>
</template>

<script>
import Close from "../assets/Close";
import File from "../assets/File";

export default {
  components: {
    Close,
    File,
  },
  data() {
    return {
      userList: this.getUsers(),
      userListMain: null,
      userName: "",
      emptyList: true,
    };
  },
  methods: {
    sendUserList() {
      return this.userList;
    },
    getUsers() {
      if (!this.userList) {
        setTimeout(async () => {
          const f = await fetch(`https://reqres.in/api/users?page=1`);
          const data = await f.json();
          this.userListMain = data.data;
          return (this.userList = data.data);
        }, 100);
      } else {
        return this.userList;
      }
    },
    clearInp() {
      this.userName = "";
      this.userList = this.userListMain;
      this.emptyList = true;
    },
    deleteUser(userToRemove) {
      if (Object.keys(this.userList).length === 1) {
        this.userList = {};
        return;
      }
      this.userList.splice(userToRemove, 1);
    },
    updateTable() {
      let temp = this.userListMain;
      this.userList = {};
      if (this.userName === "") {
        this.userList = this.userListMain;
        this.emptyList = true;
      }
      for (let i = 0; i < temp.length; i++) {
        if (
          temp[i].first_name.toLowerCase().includes(this.userName.toLowerCase())
        ) {
          this.userList[i] = temp[i];
        }
      }
      Object.keys(this.userList).length == 0
        ? (this.emptyList = false)
        : (this.emptyList = true);
    },
  },
};
</script>

<style src="./UserList.css" scoped>
</style>