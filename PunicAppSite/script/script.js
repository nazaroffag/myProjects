// const left = document.querySelectorAll("#round")[0];
// const right = document.querySelectorAll("#round")[1];
// const cards = document.querySelector("#carousel");

// left.onclick = () => {
//   let cards = document.querySelector("#carousel");
//   let temp = cards.children[0];
//   cards.children[0].remove();
//   cards.append(temp);
// };

// right.onclick = () => {
//   let cards = document.querySelector("#carousel");
//   let temp = cards.children[2];
//   cards.children[2].remove();
//   cards.prepend(temp);
// };

const state = {};
const carouselList = document.querySelector(".carousel__list");
const carouselItems = document.querySelectorAll(".carousel__item");
const elems = Array.from(carouselItems);

carouselList.addEventListener("click", function (event) {
  var newActive = event.target;
  var isItem = newActive.closest(".carousel__item");

  if (
    !isItem ||
    newActive.classList.contains("carousel__item_active") ||
    !newActive.classList.contains("carousel__item")
  ) {
    return;
  }

  update(newActive);
});

const update = function (newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);

  current.classList.remove("carousel__item_active");

  [current, prev, next, first, last].forEach((item) => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos);
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current;
  }

  return diff;
};
