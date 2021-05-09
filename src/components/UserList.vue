<template>
  <div id="inptWrapper">
    <input
      type="text"
      name="nameInpt"
      id="nameInpt"
      title="Filter by first name"
      placeholder="Enter name..."
      v-model="userName"
      @keyup="updateTable"
    />
    <button @click="clearInp" title="Clear" id="clearInpt">&#10006;</button>
  </div>
  <div v-if="!userList" class="loader"></div>
  <div id="table-wrapper">
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
          <td class="user-photo-wrapper">
            <img
              :src="`${item.avatar}`"
              :alt="`${item.first_name} ${item.last_name}`"
              :title="`${item.first_name} ${item.last_name}`"
              class="user-photo"
            />
          </td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td class="email">
            {{ item.email }}
            <button
              @click="deleteUser(idx)"
              class="delete-user"
              title="Delete user"
            >
              &#10006;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!emptyList" id="no-results">No match found</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: null,
      userListMain: null,
      userName: "",
      emptyList: true,
    };
  },
  beforeCreate() {
    setTimeout(async () => {
      const f = await fetch(`https://reqres.in/api/users?page=1`);
      const data = await f.json();
      this.userListMain = data.data;
      return (this.userList = data.data);
    }, 100);
  },
  methods: {
    clearInp() {
      this.userName = "";
      this.userList = this.userListMain;
      this.emptyList = true;
    },
    deleteUser(userToRemove) {
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