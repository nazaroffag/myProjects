<template>
  <div id="listWrapper">
    <ul v-for="(idx, list) in lists" :key="idx">
      <div id="dot" v-if="!checkBox(idx.items, idx)"></div>
      <input
        type="checkbox"
        :id="`${removeSpaces(list)}`"
        class="listGroup element"
        v-model="idx.check"
        @change="updateCheck($event, idx)"
      />
      <label :for="`${removeSpaces(list)}`">{{ list }}</label>
      <div class="hidden">
        <li v-for="(item, idx) in lists[list].items" :key="idx">
          <input
            type="checkbox"
            :id="`${removeSpaces(list) + removeSpaces(item.name)}`"
            class="listGroup"
            v-model="item.check"
            @change="updateCheck($event, item, lists[list])"
          />
          <label :for="`${removeSpaces(list) + removeSpaces(item.name)}`">{{
            item.name
          }}</label>
          <div class="itemBoxWrapper">
            <input
              type="number"
              min="0"
              step="1"
              :value="`${item.num}`"
              @change="updateLists($event, item)"
            />
            <div class="itemBox" :style="{ background: `${item.color}` }">
              <input
                type="color"
                v-model="item.color"
                @change="updateColor($event, item)"
              />
            </div>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: {
        "List 1": {
          check: false,
          items: {
            1: { name: "Item 1", color: "#ff7300", num: 5, check: true },
            2: { name: "Item 2", color: "#fbff00", num: 15, check: true },
            3: { name: "Item 3", color: "#2bff00", num: 7, check: true },
            4: { name: "Item 4", color: "#0b76ef", num: 1, check: true },
          },
        },
        "List 2": {
          check: false,
          items: {
            1: { name: "Item 1", color: "#ff7300", num: 5, check: true },
            2: { name: "Item 2", color: "#fbff00", num: 15, check: true },
            3: { name: "Item 3", color: "#2bff00", num: 7, check: true },
            4: { name: "Item 4", color: "#0b76ef", num: 2, check: true },
            5: { name: "Item 5", color: "#f8f0ff", num: 2, check: true },
            6: { name: "Item 6", color: "#ff0800", num: 4, check: true },
            7: { name: "Item 7", color: "#ff00f2", num: 9, check: true },
          },
        },
        "List 3": {
          check: false,
          items: {
            1: { name: "Item 1", color: "#ff7300", num: 5, check: true },
            2: { name: "Item 2", color: "#fbff00", num: 15, check: true },
            3: { name: "Item 3", color: "#ff0800", num: 7, check: true },
            4: { name: "Item 4", color: "#ff00f2", num: 2, check: true },
            5: { name: "Item 5", color: "#2bff00", num: 2, check: true },
            6: { name: "Item 6", color: "#fbff00", num: 4, check: true },
            7: { name: "Item 7", color: "#66ff00", num: 9, check: true },
          },
        },
        "List 4": {
          check: false,
          items: {
            1: { name: "Item 1", color: "#ff7300", num: 5, check: true },
            2: { name: "Item 2", color: "#fbff00", num: 15, check: true },
            3: { name: "Item 3", color: "#ff0800", num: 7, check: true },
            4: { name: "Item 4", color: "#ff00f2", num: 2, check: true },
            5: { name: "Item 5", color: "#2bff00", num: 2, check: true },
            6: { name: "Item 6", color: "#fbff00", num: 4, check: true },
            7: { name: "Item 7", color: "#66ff00", num: 9, check: true },
          },
        },
        "List 5": {
          check: false,
          items: {
            1: { name: "Item 1", color: "#ff7300", num: 5, check: true },
            2: { name: "Item 2", color: "#fbff00", num: 15, check: true },
            3: { name: "Item 3", color: "#ff0800", num: 7, check: true },
            4: { name: "Item 4", color: "#ff00f2", num: 2, check: true },
            5: { name: "Item 5", color: "#fbff00", num: 2, check: true },
            6: { name: "Item 6", color: "#66ff00", num: 4, check: true },
            7: { name: "Item 7", color: "#00a2ff", num: 9, check: true },
          },
        },
      },
    };
  },
  methods: {
    checkBox(e, list) {
      let elements = Object.keys(e).length;
      let sum = 0;
      for (let i = 1; i <= Object.keys(e).length; i++) {
        if (e[i]["check"] === true) {
          sum++;
        }
      }
      if (typeof list.items !== "undefined") {
        if (list.check === false) {
          return true;
        }
      }

      if (elements === sum || sum === 0) {
        return true;
      } else {
        return false;
      }
    },
    removeSpaces(str) {
      return str.replace(/\s+/g, "");
    },
    updateLists(e, idx) {
      e.target.value < 0 ? (e.target.value = 0) : e.target.value;
      idx.num = +e.target.value;
      idx.num === 0 ? (idx.check = false) : (idx.check = true);
      this.changeLists();
    },
    updateCheck(e, idx, list) {
      if (typeof idx.items !== "undefined") {
        for (let i = 1; i <= Object.keys(idx.items).length; i++) {
          idx.items[i]["num"] > 0
            ? (idx.items[i]["check"] = true)
            : (idx.items[i]["check"] = false);
        }
      }
      if (typeof idx.items === "undefined") {
        let sum = 0;
        for (let i = 1; i <= Object.keys(list.items).length; i++) {
          if (list.items[i]["check"] === true) {
            sum++;
          }
        }
        if (sum === 0) {
          list.check = false;
        } else {
          list.check = true;
        }
      }
      idx.check = e.target.checked;
      this.changeLists();
    },
    updateColor(e, idx) {
      idx.color = e.target.value;
      this.changeLists();
    },
    changeLists() {
      this.$emit("changeLists", this.lists);
    },
  },
  mounted() {
    this.changeLists();
  },
};
</script>

<style src="./ListItem.css" scoped>
</style>