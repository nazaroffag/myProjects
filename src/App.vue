<template>
  <div id="wrapper">
    <div
      id="backdrop"
      v-if="backdrop"
      @click="
        calendar === false
          ? ((calendar = true), (backdrop = true))
          : ((calendar = false), (backdrop = false))
      "
    ></div>
    <div id="top-panel">
      <div id="title-wrapper">
        <ojowo-logo />
        <span>Beta</span>
      </div>
      <top-module />
    </div>
    <div id="content">
      <aside>
        <side-panel />
      </aside>
      <main>
        <header>
          <div class="header-line">
            <div class="filter-menu-group">
              <div class="filter-menu-wrapper">
                <calendar-icon class="filer-icon" />
                <nav id="calendar-menu">За 1 день</nav>
              </div>
              <div
                class="filter-menu-wrapper"
                @click="
                  calendar === false
                    ? ((calendar = true), (backdrop = true))
                    : ((calendar = false), (backdrop = false))
                "
              >
                <filter-icon class="filer-icon" />
                <nav id="calendar-menu">Фильтр</nav>
              </div>
            </div>
            <calendar
              v-if="calendar"
              @activateFilter="showFilter"
              @justFilterData="justFilter"
            />
            <div class="filter-menu-group">
              <button class="filterButton" id="load">Выгрузить</button>
              <button class="filterButton" id="contacts">
                Добавить контакты
              </button>
            </div>
          </div>
          <div v-if="filter" id="line"></div>
          <div v-if="filter" class="header-line" id="bottom-header-line">
            <div id="filter-result">
              {{ filterData[0] }} {{ cutMonth(filterData[2]) }} -
              {{ filterData[1] }} {{ cutMonth(filterData[3]) }}
              {{ filterData[4] }} г.
              <div id="filter-close" @click="closeFilter">&#10005;</div>
            </div>
          </div>
        </header>
        <user-table :filterData="filterData" />
      </main>
    </div>
  </div>
</template>

<script>
import UserTable from "./components/Table/UserTable.vue";
import Calendar from "./components/Calendar.vue";
import CalendarIcon from "./assets/calendarIcon.vue";
import FilterIcon from "./assets/filterIcon.vue";
import SidePanel from "./components/SidePanel/SidePanel.vue";
import TopModule from "./components/TopModule/TopModule.vue";
import OjowoLogo from "./assets/ojowoLogo.vue";

export default {
  name: "App",
  components: {
    TopModule,
    UserTable,
    Calendar,
    CalendarIcon,
    FilterIcon,
    SidePanel,
    OjowoLogo,
  },
  data() {
    return {
      calendar: false,
      filter: false,
      filterData: [],
      backdrop: false,
    };
  },
  methods: {
    closeFilter() {
      this.backdrop = false;
      this.filter = false;
      this.filterData = [];
    },
    showFilter(filter) {
      this.backdrop = false;
      this.calendar = false;
      this.filter = true;
      this.filterData = [...filter];
      this.$root.$emit("updateFilter", this.filterData);
      this.saveFilterToLocalStorage();
    },
    justFilter(filter) {
      this.backdrop = false;
      this.calendar = false;
      this.filter = false;
      this.filterData = [...filter];
      this.$root.$emit("updateFilter", this.filterData);
      this.saveFilterToLocalStorage();
    },
    cutMonth(month) {
      return month.toLowerCase().substr(0, 3);
    },
    saveFilterToLocalStorage() {
      localStorage.setItem("filterData", JSON.stringify(this.filterData));
    },
  },
  mounted() {
    let storageData = JSON.parse(localStorage.getItem("filterData"));
    if (storageData) {
      this.filterData = storageData;
      if (this.filterData.length > 3) {
        this.filter = true;
      }
    } else {
      this.filterData = [];
    }
  },
};
</script>

<style src="./App.css">
</style>
