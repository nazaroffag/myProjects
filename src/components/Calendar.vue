<template>
  <div id="calendar-wrapper">
    <div id="menu-wrapper">
      <button
        class="menu-item"
        v-for="(item, idx) in menu"
        :key="idx"
        @click="menuHandler(idx)"
      >
        {{ item }}
      </button>
    </div>
    <article id="calendar">
      <header>
        <div class="current-date">
          <div class="today">
            <div class="arrow_border" @click="monthDown()">
              <div class="arrow-left"></div>
            </div>
            <div>{{ month[currentDate.month] }}, {{ currentDate.year }}</div>
            <div class="arrow_border" @click="monthUp()">
              <div class="arrow-right"></div>
            </div>
          </div>
        </div>
      </header>
      <section id="weekdays-wrapper">
        <div class="weekdays">
          <div
            class="weekday"
            v-for="(weekday, index) in weekdays"
            :key="index"
          >
            {{ weekday }}
          </div>
        </div>
        <div class="date">
          <div
            class="day-hidden"
            v-for="(n, index) in firstMonthDay - 1"
            :key="'prev' + index"
          >
            {{ prevMonthDays + 1 - firstMonthDay + n }}
          </div>
          <div
            v-for="(n, index) in currentMonthDays"
            :key="'day' + index"
            class="day"
            @click="getDay(n, month.indexOf(month[currentDate.month]))"
            :class="{
              chosen: checkPeriod(n, month.indexOf(month[currentDate.month])),
              limitLeft: checkLimitLeft(
                n,
                month.indexOf(month[currentDate.month])
              ),
              limitRight: checkLimitRight(
                n,
                month.indexOf(month[currentDate.month])
              ),
            }"
          >
            <div
              :class="{
                active: checkDay(n, month.indexOf(month[currentDate.month])),
              }"
            >
              {{ n }}
            </div>
          </div>
          <div
            class="day-hidden"
            v-for="(n, index) in 43 - (currentMonthDays + firstMonthDay)"
            :key="'next' + index"
          >
            {{ n }}
          </div>
        </div>
      </section>
      <section id="button-wrapper">
        <button class="reject-button" @click="deleteData">Отмена</button>
        <button
          class="accept-button"
          :class="{ 'button-active': buttonActive }"
          @click="activateFilter"
        >
          Обновить
        </button>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      menu: [
        "Весь срок",
        "Сегодня",
        "Вчера",
        "Последние 7 дней",
        "Последние 30 дней",
        "В этом месяце",
        "Прошлый месяц",
      ],
      weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      month: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      currentDate: {
        date: 0,
        month: 0,
        year: 0,
      },
      selectedDays: [],
      selectedMonths: [],
      buttonActive: false,
      menuItem: 3,
    };
  },
  computed: {
    prevMonthDays() {
      let year =
        this.currentDate.month === 0
          ? this.currentDate.year - 1
          : this.currentDate.year;
      let month = this.currentDate.month === 0 ? 12 : this.currentDate.month;
      return new Date(year, month, 0).getDate();
    },
    firstMonthDay() {
      let firstDay = new Date(
        this.currentDate.year,
        this.currentDate.month,
        1
      ).getDay();
      if (firstDay === 0) firstDay = 7;
      return firstDay;
    },
    currentDay() {
      return new Date(
        this.currentDate.year,
        this.currentDate.month,
        this.currentDate.date
      ).getDay();
    },
    currentMonthDays() {
      return new Date(
        this.currentDate.year,
        this.currentDate.month + 1,
        0
      ).getDate();
    },
    daysInPreviousMonth() {
      return new Date(
        this.currentDate.year,
        this.currentDate.month - 1,
        0
      ).getDate();
    },
  },
  methods: {
    getCurrentDate() {
      let today = new Date();
      this.currentDate.date = today.getDate();
      this.currentDate.month = today.getMonth();
      this.currentDate.year = today.getFullYear();
    },
    monthUp() {
      this.buttonActive = false;
      if (this.currentDate.month === 11) {
        this.currentDate.month = 0;
        this.currentDate.year += 1;
      } else {
        this.currentDate.month += 1;
      }
    },
    monthDown() {
      this.buttonActive = false;
      if (this.currentDate.month === 0) {
        this.currentDate.month = 11;
        this.currentDate.year -= 1;
      } else {
        this.currentDate.month -= 1;
      }
    },
    menuHandler(idx) {
      this.menuItem = idx;
      if (idx === 0) {
        this.selectedDays = [];
        this.getCurrentDate();
        this.buttonActive = true;
      }
      if (idx === 1) {
        this.selectedDays = [];
        this.getCurrentDate();
        this.selectedDays[0] = this.currentDate.date;
        this.selectedMonths[0] = this.currentDate.month;
        this.buttonActive = true;
      }
      if (idx === 2) {
        this.selectedDays = [];
        this.getCurrentDate();
        this.selectedDays[0] = this.currentDate.date - 1;
        this.selectedMonths[0] = this.currentDate.month;
        this.buttonActive = true;
      }
      if (idx === 3) {
        this.getCurrentDate();
        this.selectedDays[1] = this.currentDate.date;
        this.selectedDays[0] = this.currentDate.date - 6;
        this.selectedMonths[1] = this.currentDate.month;
        this.selectedMonths[0] = this.currentDate.month;
        this.buttonActive = true;
      }
      if (idx === 4) {
        this.selectedDays = [];
        this.getCurrentDate();
        this.selectedDays[1] = this.currentDate.date;
        this.selectedDays[0] = Math.abs(
          this.currentMonthDays -
            this.currentDate.date -
            this.daysInPreviousMonth
        );
        this.selectedMonths[1] = this.currentDate.month;
        this.selectedMonths[0] = this.currentDate.month - 1;
        this.buttonActive = true;
      }
      if (idx === 5) {
        this.selectedDays = [];
        this.getCurrentDate();
        this.selectedDays[1] = this.currentMonthDays;
        this.selectedDays[0] = 1;
        this.selectedMonths[1] = this.currentDate.month;
        this.selectedMonths[0] = this.currentDate.month;
        this.buttonActive = true;
      }
      if (idx === 6) {
        this.selectedDays = [];
        this.getCurrentDate();
        this.currentDate.month = this.currentDate.month - 1;
        this.selectedDays[1] = this.daysInPreviousMonth;
        this.selectedDays[0] = 1;
        this.selectedMonths[1] = this.currentDate.month;
        this.selectedMonths[0] = this.currentDate.month;
        this.buttonActive = true;
      }
    },
    getDay(day, month) {
      this.buttonActive = true;
      if (this.selectedDays.length <= 1) {
        this.selectedDays[1] = day;
        this.selectedMonths[1] = month;
      } else {
        this.selectedDays.shift();
        this.selectedDays[1] = day;
        this.selectedMonths.shift();
        this.selectedMonths[1] = month;
      }
    },
    checkDay(day, month) {
      if (
        (this.selectedDays[0] === day && this.selectedMonths[0] === month) ||
        (this.selectedDays[1] === day && this.selectedMonths[1] === month)
      ) {
        return true;
      } else {
        return false;
      }
    },
    checkLimitLeft(day, month) {
      if (this.selectedMonths.length === 2 && this.selectedDays.length === 2) {
        if (this.selectedMonths[0] === month && day === this.selectedDays[0]) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkLimitRight(day, month) {
      if (this.selectedMonths.length === 2 && this.selectedDays.length === 2) {
        if (this.selectedMonths[1] === month && day === this.selectedDays[1]) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkPeriod(day, month) {
      if (this.selectedMonths.length === 2 && this.selectedDays.length === 2) {
        if (
          this.selectedMonths[0] === this.selectedMonths[1] &&
          this.selectedMonths[0] === month &&
          ((day > this.selectedDays[0] && day < this.selectedDays[1]) ||
            (day < this.selectedDays[0] && day > this.selectedDays[1]))
        ) {
          return true;
        } else if (
          (this.selectedMonths[0] > month && month > this.selectedMonths[1]) ||
          (this.selectedMonths[0] < month && month < this.selectedMonths[1])
        ) {
          return true;
        } else if (this.selectedMonths[0] < this.selectedMonths[1]) {
          if (
            (day >= this.selectedDays[0] &&
              day <= 31 &&
              month === this.selectedMonths[0]) ||
            (month === this.selectedMonths[1] &&
              0 < day &&
              day <= this.selectedDays[1])
          ) {
            return true;
          } else {
            return false;
          }
        } else if (this.selectedMonths[0] > this.selectedMonths[1]) {
          if (
            (day <= this.selectedDays[0] &&
              day > 0 &&
              month === this.selectedMonths[0]) ||
            (month === this.selectedMonths[1] &&
              31 >= day &&
              day >= this.selectedDays[1])
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    },
    deleteData() {
      this.selectedDays = [];
      this.getCurrentDate();
      this.selectedDays[0] = this.currentDate.date;
      this.selectedMonths[0] = this.currentDate.month;
      this.buttonActive = false;
    },
    activateFilter() {
      if (this.buttonActive) {
        let filterData = [];
        if (
          this.selectedDays[1] &&
          (this.selectedDays[1] != this.selectedDays[0] ||
            this.selectedMonths[1] != this.selectedMonths[0])
        ) {
          if (
            this.selectedDays[1] > this.selectedDays[0] &&
            this.selectedMonths[1] >= this.selectedMonths[0]
          ) {
            filterData.push(this.selectedDays[0]);
            filterData.push(this.selectedDays[1]);
            filterData.push(
              this.month[this.selectedMonths[0]].toLowerCase().substr(0, 3)
            );
            filterData.push(
              this.month[this.selectedMonths[1]].toLowerCase().substr(0, 3)
            );
          } else if (
            this.selectedDays[1] <= this.selectedDays[0] &&
            this.selectedMonths[1] < this.selectedMonths[0]
          ) {
            filterData.push(this.selectedDays[1]);
            filterData.push(this.selectedDays[0]);
            filterData.push(
              this.month[this.selectedMonths[1]].toLowerCase().substr(0, 3)
            );
            filterData.push(
              this.month[this.selectedMonths[0]].toLowerCase().substr(0, 3)
            );
          } else if (
            this.selectedDays[1] > this.selectedDays[0] &&
            this.selectedMonths[1] < this.selectedMonths[0]
          ) {
            filterData.push(this.selectedDays[0]);
            filterData.push(this.selectedDays[1]);
            filterData.push(
              this.month[this.selectedMonths[1]].toLowerCase().substr(0, 3)
            );
            filterData.push(
              this.month[this.selectedMonths[0]].toLowerCase().substr(0, 3)
            );
          } else if (
            this.selectedDays[1] <= this.selectedDays[0] &&
            this.selectedMonths[1] >= this.selectedMonths[0]
          ) {
            filterData.push(this.selectedDays[1]);
            filterData.push(this.selectedDays[0]);
            filterData.push(
              this.month[this.selectedMonths[0]].toLowerCase().substr(0, 3)
            );
            filterData.push(
              this.month[this.selectedMonths[1]].toLowerCase().substr(0, 3)
            );
          }
          filterData.push(this.currentDate.year);
          this.$emit("activateFilter", filterData);
        } else {
          filterData.push(this.currentDate.date);
          filterData.push(
            this.month[this.currentDate.month].toLowerCase().substr(0, 3)
          );
          filterData.push(this.currentDate.year);
          this.$emit("justFilterData", filterData);
        }
      }
    },
  },
  created() {
    this.getCurrentDate();
    this.selectedDays.push(this.currentDate.date);
    this.selectedMonths.push(this.currentDate.month);
  },
};
</script>

<style scoped src="./Calendar.css">
</style>