import * as flsFunctions from "./modules/functions.js";
import noUiSlider from "nouislider";

flsFunctions.isWebp();

console.log("Hello, js here");

// подключение swiper
import Swiper, { Navigation, Pagination } from "swiper";

const swiper = new Swiper();

// rangeSlider

document.addEventListener("DOMContentLoaded", () => {
  var slider = document.querySelector(".range-slider__slider");

  if (slider) {
    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      // tooltips: [true, true],
      range: {
        min: 0,
        max: 100,
      },
    });
  }
});
