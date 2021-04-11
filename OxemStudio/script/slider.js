const SLIDER = document.querySelector("#slider");
const SLIDER_HEADER = document.querySelector("#sliderHeader");
const SLIDER_TEXT = document.querySelector("#sliderText");

const ARROW_LEFT = document.querySelector("#sliderArrowLeft");
const ARROW_RIGHT = document.querySelector("#sliderArrowRight");

const DOTS = document.querySelectorAll(".sliderDot");

const sliderData = {
  1: {
    image: 'url("img/autoMobile.jpg")',
    header: "Авто в лизинг для физических лиц",
    text: "Получите машину за 5 дней",
  },
  2: {
    image: 'url("img/2.jpg")',
    header: "Авто в лизинг для юридических лиц",
    text: "Получите машину за 3 дня",
  },
  3: {
    image: 'url("img/3.jpg")',
    header: "Авто в лизинг для предпринимателей",
    text: "Получите машину за 1 день",
  },
  4: {
    image: 'url("img/4.jpg")',
    header: "Авто в лизинг для госстуктур",
    text: "Получите машину за 4 дня",
  },
  5: {
    image: 'url("img/5.jpg")',
    header: "Авто в лизинг для сельских жителей",
    text: "Получите машину за 10 дней",
  },
};

let pic = 1;

ARROW_LEFT.addEventListener("click", () => {
  pic--;
  if (pic == 0) {
    pic = 5;
  }
  SLIDER.style.backgroundImage = sliderData[pic].image;
  SLIDER_HEADER.innerText = sliderData[pic].header;
  SLIDER_TEXT.innerText = sliderData[pic].text;
  console.log(pic);
});

ARROW_RIGHT.addEventListener("click", () => {
  pic++;
  if (pic == 6) {
    pic = 1;
  }
  SLIDER.style.backgroundImage = sliderData[pic].image;
  SLIDER_HEADER.innerText = sliderData[pic].header;
  SLIDER_TEXT.innerText = sliderData[pic].text;
  console.log(pic);
});

for (const [index, dot] of DOTS.entries()) {
  dot.addEventListener("click", () => {
    SLIDER.style.backgroundImage = sliderData[index + 1].image;
    SLIDER_HEADER.innerText = sliderData[index + 1].header;
    SLIDER_TEXT.innerText = sliderData[index + 1].text;
  });
}
