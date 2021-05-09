<template>
  <div>
    <div id="textOut">{{ textOut }}%</div>
    <input
      type="range"
      name="range-input"
      id="range-input"
      min="0"
      max="100"
      step="1"
      v-model="rangeValue"
      @input="changeValue"
      :percent="percent"
    />
    <div id="range-percent">
      <div
        v-for="item in percentItems"
        :key="item"
        @click="selectPercent(item)"
        class="range-percent-item"
      >
        {{ item }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentItems: [25, 50, 75, 100],
      rangeValue: this.percent,
      textOut: null,
    };
  },
  props: {
    percent: {
      type: Number,
      required: true,
      default: 34.5,
    },
  },
  created() {
    this.changeValue();
  },
  methods: {
    selectPercent(item) {
      this.rangeValue = item;
      this.changeValue();
    },
    changeValue() {
      this.$emit("changeValue", +this.rangeValue);
      return (this.textOut = +this.rangeValue);
    },
  },
};
</script>

<style scoped src="./CustomRange.css">
</style>