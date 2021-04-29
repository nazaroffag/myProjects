class Spring {
  constructor({ mass, tension, friction, initVelocity, from, to, onUpdate }) {
    this.mass = mass; // Масса пружины
    this.tension = tension; // Коэффициент упругости
    this.friction = friction; // Коэффициент трения
    this.initVelocity = initVelocity; // Начальная скорость

    this.from = from; // От какого значения анимировать
    this.to = to; // До какого значения анимировать
    this.onUpdate = onUpdate; // Каллбек, вызывающийся при обновлении значения
  }

  startAnimation() {
    const callDoAnimationTick = () => {
      const isFinished = this.doAnimationTick();

      if (isFinished) {
        return;
      }

      this.nextTick = window.requestAnimationFrame(callDoAnimationTick);
    };

    callDoAnimationTick();
  }

  stopAnimation() {
    const { nextTick } = this;

    if (nextTick) {
      window.cancelAnimationFrame(nextTick);
    }

    this.isFinished = true;
  }

  doAnimationTick() {
    const {
      mass,
      tension,
      friction,
      initVelocity,
      from,
      to,
      previousTimestamp,
      prevVelocity,
      prevValue,
      onUpdate,
    } = this;

    // Считаем Δt
    const currentTimestamp = performance.now();
    const deltaT =
      (currentTimestamp - (previousTimestamp || currentTimestamp)) / 1000;
    const normalizedDeltaT = Math.min(deltaT, 0.046);

    let prevSafeVelocity = prevVelocity || initVelocity || 0;
    let prevSafeValue = prevValue || from;

    // Считаем силу упругости, силу трения и ускорение
    const springRestoringForce = -1 * tension * (prevSafeValue - to);
    const dampingForce = -1 * prevSafeVelocity * friction;
    const acceleration = (springRestoringForce + dampingForce) / mass;

    // Считаем новую скорость и новое значение анимации
    const newVelocity = prevSafeVelocity + acceleration * normalizedDeltaT;
    const newValue = prevSafeValue + newVelocity * normalizedDeltaT;

    // Проверяем анимацию на конец
    const precision = 0.001;
    const isFinished =
      Math.abs(newVelocity) < precision && Math.abs(newValue - to) < precision;

    onUpdate({ value: newValue, isFinished });

    this.previousTimestamp = currentTimestamp;
    this.prevValue = newValue;
    this.prevVelocity = newVelocity;
    this.isFinished = isFinished;

    return isFinished;
  }
}
