<template>
  <div id="wrapper">
    <h1>Шаг {{ `${page === true ? "1" : "2"}` }}</h1>
    <div id="page_1" v-if="page">
      <section>
        <span>Информация об организаторе</span>
        <label for="name">Организатор</label>
        <input
          type="text"
          id="name"
          placeholder="Coca-Cola"
          class="form_block"
          v-model="data.company"
          @input="hideError('err_company')"
        />
        <div class="error" ref="err_company">Поле не может быть пустым</div>
      </section>
      <section>
        <span>Контактные данные</span>
        <div id="contacts">
          <div class="contact_wrapper">
            <label for="phone">Телефон</label>
            <input
              type="tel"
              id="phone"
              placeholder="+7 (999) 555-33-22"
              class="form_block"
              v-model="data.phone"
              @input="hideError('err_phone'), hideError('valid_phone')"
            />
            <div class="error" ref="err_phone">Поле не может быть пустым</div>
            <div ref="valid_phone" class="error">Введите корректный номер</div>
          </div>
          <div class="contact_wrapper">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="ivanov@mail.ru"
              class="form_block"
              v-model="data.email"
              @input="hideError('err_email'), hideError('valid_email')"
            />
            <div class="error" ref="err_email">Поле не может быть пустым</div>
            <div ref="valid_email" class="error">Введите корректный e-mail</div>
          </div>
          <div class="contact_wrapper">
            <label for="city">Город организатора</label>
            <input
              type="text"
              id="city"
              placeholder="Казань"
              class="form_block"
              v-model="data.city"
              @input="hideError('err_city')"
            />
            <div class="error" ref="err_city">Поле не может быть пустым</div>
          </div>
        </div>
      </section>
      <section>
        <span>Общая информация</span>
        <label for="info">Название</label>
        <input
          type="text"
          id="info"
          class="form_block"
          v-model="data.info"
          @input="hideError('err_info')"
        />
        <div class="error" ref="err_info">Поле не может быть пустым</div>
      </section>
      <section>
        <span for="photo">Фотография</span>
        <div id="photo_flex">
          <div class="photo_wrapper">
            <div id="photo_border">
              <input
                type="file"
                id="photo"
                ref="file"
                accept="image/*"
                @change="addPhoto"
              />
              <img src="./assets/load-image.svg" alt="load-image" />
            </div>
            <span>Главная фотография (обложка мероприятия)</span>
          </div>
          <div
            class="photo_wrapper"
            v-for="(photo, idx) in data.photo"
            :key="idx"
          >
            <div id="photo_border">
              <div class="input_group_delete" @click="deleteImg(idx)">X</div>
              <img
                :src="`${photo}`"
                alt="photo"
                style="width: 85%; max-height: 120px"
              />
            </div>
            <span>Главная фотография (обложка мероприятия)</span>
          </div>
        </div>
        <div class="error" ref="err_photo">Загрузите фото</div>
      </section>
      <section>
        <span>Подробное описание</span>
        <textarea
          id="describe"
          cols="30"
          rows="7"
          class="form_block"
          v-model="data.describe"
          @keyup="hideError('err_describe')"
        ></textarea>
        <div class="error" ref="err_describe">Поле не может быть пустым</div>
      </section>
      <section>
        <div v-for="(date, idx) in periods" :key="idx" class="input_group">
          <div v-if="idx > 0" class="input_group_delete" @click="deleteDate()">
            X
          </div>
          <div class="contact_wrapper">
            <label for="dateStart">Дата начала</label>
            <input
              type="date"
              id="dateStart"
              v-model="data.dateStart[idx]"
              class="form_block"
              @input="hideError('err_date')"
            />
          </div>
          <div class="contact_wrapper">
            <label for="timeStart">Время начала</label>
            <input
              type="time"
              id="timeStart"
              v-model="data.timeStart[idx]"
              class="form_block"
              @input="hideError('err_date')"
            />
          </div>
          <div class="contact_wrapper">
            <label for="dateFinish">Дата окончания</label>
            <input
              type="date"
              id="dateFinish"
              v-model="data.dateFinish[idx]"
              class="form_block"
              @input="hideError('err_date')"
            />
          </div>
          <div class="contact_wrapper">
            <label for="timeFinish">Время окончания</label>
            <input
              type="time"
              id="timeFinish"
              v-model="data.timeFinish[idx]"
              class="form_block"
              @input="hideError('err_date')"
            />
          </div>
          <div class="error" ref="err_date">
            Вы не добавили дату и время мероприятия
          </div>
        </div>
        <button id="addDate" @click="periods = periods + 1">
          + Добавить дату
        </button>
      </section>
      <section id="rating">
        <div class="contact_wrapper">
          <label for="rating">Рейтинг мероприятия</label>
          <select
            id="rate"
            class="form_block"
            v-model="data.rating"
            @change="hideError('err_rate')"
          >
            <option v-for="rate in rateArr" :key="rate" :value="`${rate}`">
              {{ rate }}
            </option>
          </select>
          <div class="error" ref="err_rate">Поле не может быть пустым</div>
        </div>
        <div class="contact_wrapper">
          <label for="address">Адрес мероприятия</label>
          <input
            type="text"
            id="address"
            class="form_block"
            v-model="data.address"
            @input="hideError('err_address')"
          />
          <div class="error" ref="err_address">Поле не может быть пустым</div>
        </div>
      </section>
      <section id="buttons">
        <button @click="resetForm">Отменить</button>
        <button @click="changePage">Далее</button>
      </section>
    </div>
    <form id="page_2" v-if="!page">
      <section id="check_error">
        <div id="check_error_sign">!</div>
        <div id="check_error_text">
          Проверьте ваше мероприятие на наличие ошибок, если все в порядке -
          отправляйте на модерацию.
        </div>
      </section>
      <section id="form_group">
        <div id="form_group_rate">{{ data.rating }}</div>
        <div id="form_group_wrapper">
          <div id="form_group_title">{{ data.info }}}</div>
          <div class="icon_wrapper">
            <div class="icon"></div>
            <input
              type="text"
              id="icon_address"
              :value="`${data.city}`"
              readonly
            />
          </div>
          <div class="icon_wrapper">
            <div class="icon"></div>
            <input
              id="icon_date"
              type="text"
              :value="`${convertDate(data.dateStart)}, ${convertDate(
                data.dateFinish
              )}`"
              readonly
            />
          </div>
          <div class="icon_wrapper">
            <div class="icon"></div>
            <input
              type="text"
              id="icon_time"
              :value="`${data.timeStart}, ${data.timeFinish}`"
              readonly
            />
          </div>
          <p>Контакты</p>
          <div class="icon_wrapper">
            <div class="icon"></div>
            <input
              type="text"
              id="icon_phone"
              :value="`${data.phone}`"
              readonly
            />
          </div>
          <div class="icon_wrapper">
            <div class="icon"></div>
            <input
              type="text"
              id="icon_email"
              :value="`${data.email} `"
              readonly
            />
          </div>
          <div class="icon_wrapper">
            <input
              type="text"
              id="icon_company"
              :value="`${data.company} `"
              readonly
            />
            <p>Организатор мероприятия</p>
          </div>
        </div>
        <div id="image">
          <img
            :src="`${
              data.photo[0] ? data.photo[0] : './assets/load-image.svg'
            }`"
            alt="Главное фото мероприятия"
          />
        </div>
      </section>
      <section id="form_text">
        {{ data.describe }}
      </section>
      <section id="buttons">
        <button @click.prevent="changePage">Назад</button>
        <button type="submit" @click.prevent="sendForm">
          Отправить на модерацию
        </button>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      page: true,
      periods: 1,
      rateArr: ["16+"],
      data: {
        company: null,
        phone: null,
        email: null,
        city: null,
        info: null,
        photo: [],
        describe: null,
        dateStart: [],
        timeStart: [],
        dateFinish: [],
        timeFinish: [],
        address: null,
        rating: null,
      },
    };
  },
  mounted() {
    fetch("http://testwork.rdbx24.ru/api")
      .then((r) => r.json())
      .then((rating) => {
        this.rateArr = [];
        for (let i = 0; i < rating.result.length; i++) {
          this.rateArr.push(rating.result[i].title);
        }
      });
  },
  methods: {
    validatePhone(phone) {
      let regex =
        // eslint-disable-next-line no-useless-escape
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      return regex.test(phone);
    },
    validateEmail(email) {
      let word =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return word.test(String(email).toLowerCase());
    },
    addPhoto() {
      let file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener(
        "load",
        function () {
          let pic = reader.result;
          this.data.photo.push(pic);
        }.bind(this),
        false
      );
    },
    changePage() {
      if (this.page === true) {
        if (this.data.company === null) {
          this.$refs.err_company.style.visibility = "visible";
          this.$refs.err_company.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.phone === null) {
          this.$refs.err_phone.style.visibility = "visible";
          this.$refs.err_phone.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (!this.validatePhone(this.data.phone)) {
          this.$refs.valid_phone.style.visibility = "visible";
          this.$refs.valid_phone.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.email === null) {
          this.$refs.err_email.style.visibility = "visible";
          this.$refs.err_email.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (!this.validateEmail(this.data.email)) {
          this.$refs.valid_email.style.visibility = "visible";
          this.$refs.valid_email.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.city === null) {
          this.$refs.err_city.style.visibility = "visible";
          this.$refs.err_city.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.info === null) {
          this.$refs.err_info.style.visibility = "visible";
          this.$refs.err_info.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.photo.length === 0) {
          this.$refs.err_photo.style.visibility = "visible";
          this.$refs.err_photo.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.describe === null) {
          this.$refs.err_describe.style.visibility = "visible";
          this.$refs.err_describe.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (
          this.data.dateStart.length === 0 ||
          this.data.timeStart.length === 0 ||
          this.data.dateFinish.length === 0 ||
          this.data.timeFinish.length === 0
        ) {
          this.$refs.err_date.style.visibility = "visible";
          this.$refs.err_date.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.rating === null) {
          this.$refs.err_rate.style.visibility = "visible";
          this.$refs.err_rate.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else if (this.data.address === null) {
          this.$refs.err_address.style.visibility = "visible";
          this.$refs.err_address.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } else {
          this.page = false;
        }
      } else {
        this.page = true;
      }
    },
    resetForm() {
      this.data = {
        company: null,
        phone: null,
        email: null,
        city: null,
        info: null,
        photo: [],
        describe: null,
        dateStart: [],
        timeStart: [],
        dateFinish: [],
        timeFinish: [],
        address: null,
        rating: null,
      };
    },
    deleteDate() {
      if (this.periods > 1) {
        if (
          this.data.dateStart.length > 1 ||
          this.data.timeStart.length > 1 ||
          this.data.dateFinish.length > 1 ||
          this.data.timeFinish.length > 1
        ) {
          this.data.dateStart.splice(-1, 1);
          this.data.timeStart.splice(-1, 1);
          this.data.dateFinish.splice(-1, 1);
          this.data.timeFinish.splice(-1, 1);
        }
        this.periods = this.periods - 1;
      } else {
        return;
      }
    },
    deleteImg(idx) {
      this.data.photo.splice(idx, 1);
    },
    hideError(el) {
      this.$refs[el].style.visibility = "hidden";
    },
    convertDate(date) {
      let i = Object.values(date)[0];
      console.log(i);
      let dArr = i.split("-");
      return dArr[2] + "." + dArr[1] + "." + dArr[0].substring(2);
    },
  },
};
</script>

<style src="./App.css">
</style>
