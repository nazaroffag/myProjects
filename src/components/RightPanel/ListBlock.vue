//? [ ] убирать несортированные boxes, когда снят check
//? [ ] оптимизировать функцию randomizeBoxes
//? [ ] удалять несортированные boxes по клику с обновлением input
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
      <div v-if="idx.check">
        <div v-for="(item, idx) in idx.items" :key="idx">
          <div class="sortWrapper" v-if="item.check" id="sortHidden">
            <div
              class="boxItem"
              v-for="box in item.num"
              :key="box"
              :style="{ background: `${item.color}` }"
              style="cursor: pointer"
              @click="item.num = +item.num - 1"
            ></div>
          </div>
        </div>
        <div class="randomWrapper">
          <div
            class="boxItem"
            v-for="box in randomizeBoxes(idx.items)"
            :key="`${box + Math.random(1)}`"
            :style="{ background: `${box}` }"
          ></div>
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
    mixBoxes(e) {
      e.target.innerText === "Перемешать"
        ? (e.target.innerText = "Сортировать")
        : (e.target.innerText = "Перемешать");
    },
    removeSpaces(str) {
      return str.replace(/\s+/g, "");
    },
    randomizeBoxes(e) {
      let boxes = [];
      for (let i = 1; i <= Object.keys(e).length; i++) {
        for (let key in e[i]) {
          if (key == "num" || key == "color") {
            boxes.push(e[i][key]);
          }
        }
      }
      let newBoxes = [];
      for (let i = 0; i < boxes.length - 1; i = i + 2) {
        newBoxes.push({ color: boxes[i], num: boxes[i + 1] });
      }
      let randomArray = [];
      for (let i = 0; i < Object.keys(newBoxes).length; i++) {
        let num = +newBoxes[i]["num"];
        let color = newBoxes[i]["color"];
        for (let y = 1; y <= num; y++) {
          randomArray.push(color);
        }
      }
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