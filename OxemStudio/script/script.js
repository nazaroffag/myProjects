// события на кнопках и меню

const COVER = document.querySelector("#cover");
const HIDDEN_MENU_BUTTON = document.querySelector("#menuButton");
const HIDDEN_MENU = document.querySelector("#hiddenMenu");
const OPEN_PADDING_MENU = document.querySelector("#openPaddingMenu");
const PADDING_MENU = document.querySelector("#paddingMenu");
const OPEN_FORM_BUTTON = document.querySelector("#openFormButton");
const OPEN_FORM_MENU_BUTTON = document.querySelector("#openFormMenuButton");
const OPEN_FORM_REQUEST_BUTTON = document.querySelector("#requestButtonWhite");
const OPEN_FORM = document.querySelector("#openForm");
const CLOSE_HIDDEN_MENU = document.querySelector("#closeHiddenMenu");
const CLOSE_OPEN_FORM = document.querySelector("#closeOpenForm");
const SLIDER_DOT = document.querySelectorAll(".sliderDot");
const SLIDER_ARROW_LEFT = document.querySelector("#sliderArrowLeft");
const SLIDER_ARROW_RIGHT = document.querySelector("#sliderArrowRight");

function openHiddenMenu() {
  HIDDEN_MENU.style.visibility = "visible";
  HIDDEN_MENU.style.right = 0;
}

function closeHiddenMenu() {
  HIDDEN_MENU.style.right = "-100%";
  setTimeout(() => {
    HIDDEN_MENU.style.visibility = "hidden";
  }, 3000);
}

HIDDEN_MENU_BUTTON.addEventListener("click", openHiddenMenu);

CLOSE_HIDDEN_MENU.addEventListener("click", closeHiddenMenu);

OPEN_FORM_BUTTON.addEventListener("click", openFormVisible);
OPEN_FORM_REQUEST_BUTTON.addEventListener("click", openFormVisible);

function openFormVisible() {
  OPEN_FORM.style.bottom = "72px";
  OPEN_FORM.style.visibility = "visible";
}

function openFormHidden() {
  OPEN_FORM.style.bottom = "-100%";
  setTimeout(() => {
    OPEN_FORM.style.visibility = "hidden";
  }, 3000);
}

OPEN_FORM_MENU_BUTTON.addEventListener("click", () => {
  closeHiddenMenu();
  openFormVisible();
});

CLOSE_OPEN_FORM.addEventListener("click", openFormHidden);

OPEN_PADDING_MENU.addEventListener("click", () => {
  PADDING_MENU.style.visibility = "visible";
});

const PADDING_MENU_ITEMS = document.querySelectorAll(".paddingMenuItem");

for (let paddingMenuItem of PADDING_MENU_ITEMS) {
  paddingMenuItem.addEventListener("click", (event) => {
    PADDING_MENU.style.visibility = "hidden";
    event.stopPropagation();
  });
}

// события на инпутах

const PERCENT = 10;
const PRICE_INPUT = document.querySelector("#autoPriceInput");
const FIRST_PAY_INPUT = document.querySelector("#autoFirstPayInput");
const LEASE_PERIOD_INPUT = document.querySelector("#autoLeasePeriodInput");
const TOTAL_AMOUNT_INPUT = document.querySelector("#autoTotalAmountInput");
const MONTHLY_PAYMENT_INPUT = document.querySelector(
  "#autoMonthlyPaymentInput"
);
const SUM_PERCENT = document.querySelector("#percent");

PRICE_INPUT.value = addSpaces(PRICE_INPUT.value);
FIRST_PAY_INPUT.value = addSpaces(
  firstPay(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)
);

function sumPercent(firstPay, Price) {
  return Math.floor((delSpaces(firstPay) / delSpaces(Price)) * 100) + "%";
}

SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);

MONTHLY_PAYMENT_INPUT.value =
  addSpaces(
    monthlyPayment(
      PRICE_INPUT.value,
      FIRST_PAY_INPUT.value,
      PERCENT,
      LEASE_PERIOD_INPUT.value
    )
  ) + " ₽";

TOTAL_AMOUNT_INPUT.value =
  addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";

PRICE_INPUT.addEventListener("change", () => {
  PRICE_INPUT.value = addSpaces(PRICE_INPUT.value);
  FIRST_PAY_RANGE.max = delSpaces(PRICE_INPUT.value);
  FIRST_PAY_INPUT.value = addSpaces(
    firstPay(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)
  );
  MONTHLY_PAYMENT_INPUT.value =
    addSpaces(
      monthlyPayment(
        PRICE_INPUT.value,
        FIRST_PAY_INPUT.value,
        PERCENT,
        LEASE_PERIOD_INPUT.value
      )
    ) + " ₽";
  TOTAL_AMOUNT_INPUT.value =
    addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";
  SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);
});

FIRST_PAY_INPUT.addEventListener("change", () => {
  FIRST_PAY_RANGE.max = delSpaces(PRICE_INPUT.value);
  FIRST_PAY_INPUT.value = addSpaces(FIRST_PAY_INPUT.value);
  MONTHLY_PAYMENT_INPUT.value =
    addSpaces(
      monthlyPayment(
        PRICE_INPUT.value,
        FIRST_PAY_INPUT.value,
        PERCENT,
        LEASE_PERIOD_INPUT.value
      )
    ) + " ₽";
  TOTAL_AMOUNT_INPUT.value =
    addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";
  SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);
});

LEASE_PERIOD_INPUT.addEventListener("change", () => {
  MONTHLY_PAYMENT_INPUT.value =
    addSpaces(
      monthlyPayment(
        PRICE_INPUT.value,
        FIRST_PAY_INPUT.value,
        PERCENT,
        LEASE_PERIOD_INPUT.value
      )
    ) + " ₽";
  TOTAL_AMOUNT_INPUT.value =
    addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";
  SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);
});

function addSpaces(nStr) {
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? " " + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + " " + "$2");
  }
  return x1 + x2;
}

function delSpaces(nStr) {
  return nStr.replace(/\s+/g, "");
}

function firstPay(price, percent) {
  return delSpaces(price) * (percent / 100);
}

function agreementSum(totalSum, period) {
  let monthlyPay = document
    .querySelector("#autoMonthlyPaymentInput")
    .value.slice(0, -1);
  let sum =
    Number(delSpaces(totalSum)) +
    period * Number(delSpaces(monthlyPay.slice(0, -1)));
  return sum;
}

function monthlyPayment(totalSum, firstPay, percent, period) {
  let credit = Number(delSpaces(totalSum)) - Number(delSpaces(firstPay));
  let k1 = Math.pow(1 + percent, period);
  let k2 = Math.pow(1 + percent, period - 1);
  let k = ((percent / 12) * k1) / k2 / 1000;
  return Math.round(credit * k);
}

// range

const PRICE_RANGE = document.querySelector("#autoPriceRange");
const FIRST_PAY_RANGE = document.querySelector("#autoFirstPayRange");
const LEASE_RANGE = document.querySelector("#autoLeasePeriodRange");

PRICE_RANGE.addEventListener("change", () => {
  FIRST_PAY_RANGE.max = delSpaces(PRICE_INPUT.value);
  PRICE_INPUT.value = addSpaces(PRICE_RANGE.value);
  FIRST_PAY_INPUT.value = addSpaces(
    firstPay(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)
  );
  MONTHLY_PAYMENT_INPUT.value =
    addSpaces(
      monthlyPayment(
        PRICE_INPUT.value,
        FIRST_PAY_INPUT.value,
        PERCENT,
        LEASE_PERIOD_INPUT.value
      )
    ) + " ₽";
  TOTAL_AMOUNT_INPUT.value =
    addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";
  SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);
});

FIRST_PAY_RANGE.addEventListener("change", () => {
  FIRST_PAY_RANGE.max = delSpaces(PRICE_INPUT.value);
  FIRST_PAY_INPUT.value = addSpaces(FIRST_PAY_RANGE.value);
  MONTHLY_PAYMENT_INPUT.value =
    addSpaces(
      monthlyPayment(
        PRICE_INPUT.value,
        FIRST_PAY_INPUT.value,
        PERCENT,
        LEASE_PERIOD_INPUT.value
      )
    ) + " ₽";
  TOTAL_AMOUNT_INPUT.value =
    addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";
  SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);
});

LEASE_RANGE.addEventListener("change", () => {
  LEASE_PERIOD_INPUT.value = LEASE_RANGE.value;
  MONTHLY_PAYMENT_INPUT.value =
    addSpaces(
      monthlyPayment(
        PRICE_INPUT.value,
        FIRST_PAY_INPUT.value,
        PERCENT,
        LEASE_PERIOD_INPUT.value
      )
    ) + " ₽";
  TOTAL_AMOUNT_INPUT.value =
    addSpaces(agreementSum(PRICE_INPUT.value, LEASE_PERIOD_INPUT.value)) + " ₽";
  SUM_PERCENT.innerText = sumPercent(FIRST_PAY_INPUT.value, PRICE_INPUT.value);
});

// валидация телефона

function validatePhone(phone) {
  let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return regex.test(phone);
}

function transformePhone(phone) {
  let lenPhone = phone.length;
  let tt = phone.split("");
  if (lenPhone == 12) {
    tt.splice(2, "", "(");
    tt.splice(6, "", ")");
    tt.splice(10, "", "-");
    tt.splice(13, "", "-");
  } else if (lenPhone == 13) {
    tt.splice(3, "", "(");
    tt.splice(7, "", ")");
    tt.splice(11, "", "-");
    tt.splice(14, "", "-");
  }
  tt = tt.join("");
  return tt;
}

const INPUT_TEL = document.querySelector("#inputTel");

INPUT_TEL.addEventListener("change", () => {
  if (!validatePhone(INPUT_TEL.value)) {
    INPUT_TEL.style.color = "red";
    return;
  } else {
    INPUT_TEL.style.color = "black";
    INPUT_TEL.value = transformePhone(INPUT_TEL.value);
  }
});
