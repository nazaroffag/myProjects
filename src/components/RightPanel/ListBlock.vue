//! при переносе функции randomizeBoxes в computed не обновляет массив, берет данные их кэша

<template>
  <div id="listWrapper">
    <div id="listBoxSection" v-for="(idx, list) in lists" :key="idx">
      <span @click="randomizeBoxes(idx.items)">{{ list }}</span>
      <input
        class="sortInput"
        :id="`${removeSpaces(list)}right`"
        type="checkbox"
        v-if="idx.check"
      />
      <label
        :for="`${removeSpaces(list)}right`"
        class="sortButton"
        @click="mixBoxes($event)"
        v-if="idx.check"
      >
        Сортировать
      </label>
      <div id="sort" v-if="idx.check">
        <div v-for="(item, idx) in idx.items" :key="idx">
          <div class="sortWrapper" v-if="item.check" id="sortHidden">
            <transition-group name="list-complete" tag="div">
              <div
                class="boxItem list-complete-item"
                v-for="box in item.num"
                :key="box"
                :style="{ background: `${item.color}` }"
                @click="
                  (item.num = +item.num - 1), delSortedBox(item, lists[list])
                "
              ></div>
            </transition-group>
          </div>
        </div>
        <div class="randomWrapper">
          <!-- <transition-group name="list-complete" tag="div"> -->
          <div
            class="boxItem list-complete-item"
            v-for="box in randomizeBoxes(idx.items)"
            :key="`${box + Math.random(1)}`"
            :style="{ background: `${box}` }"
            @click="delRandomBox(box, idx.items, idx)"
          ></div>
          <!-- </transition-group> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Object,
    },
  },
  methods: {
    delSortedBox(arr, list) {
      if (arr.num === 0) {
        arr.check = false;
      }
      let sum = 0;
      for (let i = 1; i <= Object.keys(list.items).length; i++) {
        if (list.items[i]["check"] === true) {
          sum++;
        }
      }
      if (sum === 0) {
        list.check = false;
      }
    },
    delRandomBox(box, arr, list) {
      for (let i = 1; i <= Object.keys(arr).length; i++) {
        if (arr[i]["color"] === box) {
          arr[i]["num"] = +arr[i]["num"] - 1;
          if (arr[i]["num"] === 0) {
            arr[i]["check"] = false;
          }
        }
      }
      let sum = 0;
      for (let i = 1; i <= Object.keys(list.items).length; i++) {
        if (list.items[i]["check"] === true) {
          sum++;
        }
      }
      if (sum === 0) {
        list.check = false;
      }
    },
    mixBoxes(e) {
      e.target.innerText === "Перемешать"
        ? (e.target.innerText = "Сортировать")
        : (e.target.innerText = "Перемешать");
    },
    removeSpaces(str) {
      return str.replace(/\s+/g, "");
    },
    randomizeBoxes(e) {
      // извлекаем num и color из общего объекта list, с учетом check
      let boxes = [];
      for (let i = 1; i <= Object.keys(e).length; i++) {
        for (let key in e[i]) {
          if ((key == "num" || key == "color") && e[i]["check"] === true) {
            boxes.push(e[i][key]);
          }
        }
      }
      // создаем новый массив из объектов num + color
      let newBoxes = [];
      for (let i = 0; i < boxes.length - 1; i = i + 2) {
        newBoxes.push({ color: boxes[i], num: boxes[i + 1] });
      }
      // массив из значений color по количеству num
      let randomArray = [];
      for (let i = 0; i < Object.keys(newBoxes).length; i++) {
        let num = +newBoxes[i]["num"];
        let color = newBoxes[i]["color"];
        for (let y = 1; y <= num; y++) {
          randomArray.push(color);
        }
      }
      // рандомизируем массив color
      randomArray.sort(function () {
        return Math.random() - 0.5;
      });
      return randomArray;
    },
  },
};
</script>

<style scoped src="./ListBlock.css">
</style>