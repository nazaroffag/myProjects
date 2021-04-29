// анимация

const imgContainer = document.querySelector("#weight");
const button = document.querySelector("#button");

let realY = 0;
let initialY = 0;
let topSpring;
let dragPoints = [];

// перемещение груза
const updateImgContainerStyles = () => {
  imgContainer.style.transform = `translateY(${realY}px)`;
};

// изменение пружины
const updateSpringStyles = () => {
  spring.style.height = `${realY + 19}vh`;
  for (let line of lines) {
    line.style.height = `${realY + 20}vh`;
    if (realY >= 1) {
      line.style.backgroundSize = `21px ${realY + 13}px`;
    } else if (realY < 1) {
      line.style.backgroundSize = `21px ${realY + 15}px`;
    }
  }
};

// расчет скорости движения
const getSpeed = (field) => {
  let speedSum = 0;
  let dividerSum = 0;

  let slicedPoints = dragPoints.slice(-17);

  slicedPoints.forEach((point, idx) => {
    const prevPoint = slicedPoints[idx - 1];

    if (!prevPoint) {
      return;
    }

    const speed =
      (point[field] - prevPoint[field]) /
      ((point.timestamp - prevPoint.timestamp) / 1000);
    const alpha = 1 / (slicedPoints.length - idx) ** 2;

    speedSum += speed * alpha;
    dividerSum += alpha;
  });

  return speedSum / dividerSum;
};

// кнопка Play, запуск и остановка анимации
button.addEventListener("click", (imgContainer) => {
  button.innerText == "Play"
    ? ((button.innerText = "Stop"), springAnimation(imgContainer))
    : ((button.innerText = "Play"), topSpring.stopAnimation());
});

// механизм анимации
function springAnimation(imgContainer) {
  realY = initialY + +inpEquilibrium.value - initialY;

  dragPoints.push({
    y: imgContainer.clientY,
    timestamp: performance.now(),
  });

  updateImgContainerStyles();
  updateSpringStyles();

  const ySpeed = getSpeed("y");

  const springConfig = {
    friction: 0.2,
    tension: inpRigidity.value,
    mass: inpWeight.value,
  };

  topSpring = new Spring({
    ...springConfig,
    initVelocity: ySpeed,
    from: realY,
    to: 0,
    onUpdate: ({ value }) => {
      realY = value;

      updateImgContainerStyles();
      updateSpringStyles();
    },
  });

  topSpring.startAnimation();
}
