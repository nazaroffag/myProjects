import * as flsFunctions from "./modules/functions.js";
import { Calendar } from "./modules/calendar.js";
import { imask } from "./modules/i-mask.js";
import { slider } from "./modules/slider.js";

flsFunctions.isWebp();

console.log("Hello, js's here");

// подключение swiper
import Swiper, { Navigation, Pagination } from "swiper";

const swiper = new Swiper();

document.addEventListener("DOMContentLoaded", () => {
  imask();
  Calendar();
  slider();
});
