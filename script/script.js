const inpWeight = document.querySelector("#inpWeight");
const inpRigidity = document.querySelector("#inpRigidity");
const inpEquilibrium = document.querySelector("#inpEquilibrium");
const rangeWeight = document.querySelector("#rangeWeight");
const rangeRigidity = document.querySelector("#rangeRigidity");
const rangeEquilibrium = document.querySelector("#rangeEquilibrium");
const outCycle = document.querySelector("#outCycle");
const outTime = document.querySelector("#outTime");
const outHesistation = document.querySelector("#outHesistation");
const outX = document.querySelector("#outX");
const weight = document.querySelector("#weight");
const spring = document.querySelector("#spring");
const lines = document.querySelectorAll(".line");

inpWeight.addEventListener("change", () => {
  rangeWeight.value = inpWeight.value;
  updatingData();
});

rangeWeight.addEventListener("change", () => {
  inpWeight.value = rangeWeight.value;
  updatingData();
});

inpRigidity.addEventListener("change", () => {
  rangeRigidity.value = inpRigidity.value;
  updatingData();
});

rangeRigidity.addEventListener("change", () => {
  inpRigidity.value = rangeRigidity.value;
  updatingData();
});

inpEquilibrium.addEventListener("change", () => {
  rangeEquilibrium.value = inpEquilibrium.value;
  updatingData();
});

rangeEquilibrium.addEventListener("change", () => {
  inpEquilibrium.value = rangeEquilibrium.value;
  updatingData();
});

updatingData();

// частота колебаний w
function cyclicFrequency(k, m) {
  return +Math.sqrt(k / m).toFixed(2);
}

// время колебаний
function hesistationTime(k, m) {
  return +(
    (cyclicFrequency(k, m) / 2) *
    Math.PI *
    60 *
    2 *
    Math.PI *
    Math.sqrt(m / k)
  ).toFixed(2);
}

// количество колебаний
function hesistationAmount(k, m) {
  return +((cyclicFrequency(k, m) / (2 * Math.PI)) * 60).toFixed(0);
}

// координата Х
function coordinateX(x, k, m) {
  console.log();
  return +(x * Math.cos(cyclicFrequency(k, m) * hesistationTime(k, m))).toFixed(
    2
  );
}

// обновление состояния элементов при изменении полей
function updatingData() {
  outCycle.value = cyclicFrequency(inpRigidity.value, inpWeight.value);
  outTime.value = hesistationTime(inpRigidity.value, inpWeight.value);
  outHesistation.value = hesistationAmount(inpRigidity.value, inpWeight.value);
  outX.value = coordinateX(
    inpEquilibrium.value,
    inpRigidity.value,
    inpWeight.value
  );
  weightSize();
  springDeviation();
}

// изменение размера груза
function weightSize() {
  weight.style.width = 60 * Math.cbrt(inpWeight.value) + "px";
  weight.style.height = 60 * Math.cbrt(inpWeight.value) + "px";
}

// изменение отклонения пружины
function springDeviation() {
  spring.style.height = `${+inpEquilibrium.value + 5}vh`;
  for (let line of lines) {
    line.style.height = `${+inpEquilibrium.value + 5}vh`;
    if (+inpEquilibrium.value >= 4 && +inpEquilibrium.value <= 18) {
      line.style.backgroundSize = `20px ${+inpEquilibrium.value + 3}px`;
    } else if (+inpEquilibrium.value < 4) {
      line.style.backgroundSize = `20px 6px`;
    } else if (+inpEquilibrium.value > 18) {
      line.style.backgroundSize = `20px 20px`;
    }
  }
}
