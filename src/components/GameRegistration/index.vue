<template>
  <div class="GameRegistration" id="GameRegistration">
    <ValidationObserver
      tag="div"
      class="GameRegistration__formWrapper"
      ref="form"
      v-slot="{ invalid, reset, handleSubmit }"
    >
      <br v-if="isFinishedRegistration" />
      <h2 v-if="!isFinishedRegistration" class="registrationEnd">
        Регистрация
      </h2>
      <h2 class="registrationEnd" v-if="isFinishedRegistration">
        Регистрация завершена
      </h2>
      <br v-if="isFinishedRegistration" />
      <form
        class="GameRegistration__form"
        @submit.prevent="handleSubmit(onSubmit)"
        v-if="!isFinishedRegistration"
        id="game"
      >
        <div class="GameRegistration__formContent">
          <div
            class="GameRegistration__blockContent GameRegistration__FIOBlock"
          >
            <ValidationProvider
              mode="lazy"
              tag="div"
              name="surname"
              rules="required"
              v-slot="{ errors }"
              class="ValidationProvider"
            >
              <input
                v-model="model.surname"
                type="text"
                placeholder="Фамилия*"
              />
              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              mode="lazy"
              tag="div"
              name="name"
              rules="required"
              v-slot="{ errors }"
              class="ValidationProvider"
            >
              <input v-model="model.name" type="text" placeholder="Имя*" />
              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              name="secondName"
              v-slot="{ errors }"
              class="ValidationProvider"
            >
              <input
                v-model="model.secondName"
                type="text"
                placeholder="Отчество"
              />
              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div
            class="GameRegistration__blockContent GameRegistration__techInfo"
          >
            <div class="GameRegistration__phoneInfo">
              <ValidationProvider
                tag="div"
                v-slot="{ errors }"
                rules="required"
                name="phoneFirst"
                class="ValidationProvider phoneFirst"
              >
                <input v-model="model.phoneFirst" type="text" />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                tag="div"
                rules="required"
                v-slot="{ validate, errors }"
                :name="'phoneCode'"
                class="ValidationProvider code"
                v-if="forceBadRerender"
              >
                <CustomSelector
                  v-model="model.phoneCode"
                  :options="['29', '25', '33', '44']"
                  @blur="validate"
                />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                tag="div"
                v-slot="{ errors }"
                rules="required|mobilephone"
                name="phone"
                class="ValidationProvider phone"
              >
                <input
                  v-model="model.phone"
                  placeholder="XXXXXXX*"
                  type="text"
                />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                tag="div"
                rules="required"
                v-slot="{ validate, errors }"
                :name="'operator'"
                class="ValidationProvider operator"
                v-if="forceBadRerender"
              >
                <CustomSelector
                  v-model="model.operator"
                  placeholder="Оператор"
                  :options="['МТС', 'А1', 'Life']"
                  @blur="validate"
                />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <ValidationProvider
              tag="div"
              class="ValidationProvider"
              v-slot="{ errors }"
              rules="required|email"
              name="email"
            >
              <input v-model="model.email" placeholder="E-mail*" type="text" />

              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              tag="div"
              class="ValidationProvider"
              v-slot="{ errors }"
              rules="required"
              name="post"
            >
              <input
                v-model="model.post"
                placeholder="Почтовый адрес*"
                type="text"
              />

              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="GameRegistration__blockContent">
            <span
              class="GameRegistration__blockContentTitle GameRegistration__blockContentTitle_dateTitle"
            >
              Дата совершения покупки*
            </span>
            <div class="GameRegistration__date">
              <ValidationProvider
                tag="div"
                rules="required"
                v-slot="{ validate, errors }"
                :name="'day'"
                class="ValidationProvider day"
                v-if="forceBadRerender"
              >
                <CustomSelector
                  v-model="model.day"
                  :options="periods[model.month]"
                  @blur="validate"
                />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                tag="div"
                rules="required"
                v-slot="{ validate, errors }"
                :name="'month'"
                class="ValidationProvider month"
                v-if="forceBadRerender"
              >
                <CustomSelector
                  v-model="model.month"
                  :options="months"
                  @blur="validate"
                />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                tag="div"
                class="ValidationProvider year"
                v-slot="{ errors }"
                rules="required"
                name="year"
              >
                <input v-model="model.year" type="text" disabled />

                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <ValidationProvider
              tag="div"
              class="ValidationProvider"
              v-slot="{ errors }"
              rules="required"
              name="cheque"
            >
              <input
                placeholder="Номер чека*"
                v-model="model.cheque"
                type="text"
              />

              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              tag="div"
              class="ValidationProvider file"
              rules="required|mimes:image/jpeg,image/png|size:40000"
              v-slot="{ validate, errors }"
              name="fileCheck"
            >
              <div class="customFileInput">
                <input
                  type="file"
                  @change="
                    validate($event);
                    onFileChange($event);
                  "
                  placeholder="Загрузить картинку"
                  accept="image/jpeg,image/png"
                  ref="fileInput"
                />
                <span
                  class="customFileInput__fileName"
                  :style="{
                    color: model.file_name
                      ? 'rgb(255, 93, 162) '
                      : 'rgb(255, 93, 162)',
                  }"
                >
                  {{
                    model.file_name ? model.file_name : "Загрузить фото чека*"
                  }}
                </span>
                <div class="customFileInput__helper">
                  <div class="customFileInput__helperModal">
                    <p class="customFileInput__helperModal_p">ВНИМАНИЕ!</p>
                    <p class="customFileInput__helperModal_p">
                      «Тип файла: JPEG, JPG, размер не более 5 Мб., разрешение
                      не менее 200 (двести) dpi. Не допускаются изображения, не
                      являющиеся фотографиями (скриншоты, оттиски, картинки,
                      компьютерная графика, фотомонтаж. Чек должен быть
                      сфотографирован полностью, включая верхний и нижний край
                      чека, изображение чека должна быть строго вертикально
                      ориентированным. Фотографировать чек необходимо под прямым
                      углом. Загруженные чеки проходят проверку на соответствие
                      условиям Акции (модерацию) в течение 72 часов с момента их
                      загрузки.»;
                    </p>
                  </div>
                  <img
                    @click="clickFileInputImg"
                    src="./../../assets/icons/camera.svg"
                    alt=""
                  />
                </div>
              </div>
              <span class="errorContainer">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div
          class="GameRegistration__formContent GameRegistration__formContent_items"
        >
          <span class="GameRegistration__blockContentTitle">
            Игровой товар
          </span>
          <ul class="tovar">
            <li v-for="(item, index) in model.choosedItems" :key="index">
              <ValidationProvider
                tag="div"
                rules="required"
                v-slot="{ validate, errors }"
                :name="'itemName'"
                class="ValidationProvider itemName"
                v-if="forceBadRerender"
              >
                <CustomSelector
                  v-model="item.value"
                  placeholder="Выберите товар*"
                  :options="items"
                  @blur="validate"
                />
                <span class="errorContainer">{{ errors[0] }}</span>
              </ValidationProvider>

              <div class="createPart">
                <ValidationProvider
                  tag="div"
                  rules="required"
                  v-slot="{ validate, errors }"
                  :name="'itemCount'"
                  class="ValidationProvider itemCount"
                  v-if="forceBadRerender"
                  :style="{
                    width:
                      index + 1 < model.choosedItems.length
                        ? '100% !important'
                        : '58vw',
                  }"
                >
                  <CustomSelector
                    v-model="item.count"
                    :options="countTypes"
                    @blur="validate"
                  />
                  <span class="errorContainer">{{ errors[0] }}</span>
                </ValidationProvider>

                <button
                  v-if="index + 1 === model.choosedItems.length"
                  @click.prevent="addItem"
                  class="btncreate"
                >
                  +
                </button>
              </div>
            </li>
          </ul>
        </div>

        <button type="submit" class="btn" :disabled="invalid">
          Зарегистрироваться
        </button>
        <div class="GameRegistration__RulesBlock">
          <ValidationProvider
            tag="div"
            :rules="{ required: { allowFalse: false } }"
            v-slot="{ errors }"
            name="rule1"
            class="ValidationProvider"
          >
            <div class="CustomCheckbox">
              <input type="checkbox" v-model="rule1" />
              <div
                :class="{
                  CustomCheckbox__pseudoInput: true,
                  active: rule1,
                }"
              >
                <span v-if="rule1">√</span>
                <!-- <img src="" alt="TEST" /> -->
              </div>
              <span
                >*Регистрируясь, Вы подтверждаете свое согласие на участие в
                рекламной игре.</span
              >
              <span class="errorContainer">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            :rules="{ required: { allowFalse: false } }"
            v-slot="{ errors }"
            name="rule2"
            class="ValidationProvider"
          >
            <div class="CustomCheckbox">
              <input type="checkbox" v-model="rule2" />
              <div
                :class="{
                  CustomCheckbox__pseudoInput: true,
                  active: rule2,
                }"
              >
                <span v-if="rule2">√</span>
                <!-- <img src="" alt="TEST" /> -->
              </div>
              <span
                >*Регистрируясь, Вы подтверждаете, что изучили и согласны с
                <a href="rules.pdf" target="_blank"
                  >правилами рекламной игры.</a
                ></span
              >
              <span class="errorContainer">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="GameRegistration__messageForRequired">
          *поля, обязательные для заполнения
        </div>
      </form>
    </ValidationObserver>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated  animate__fadeInDown"
      leave-active-class="animate__animated  animate__fadeOut"
    >
      <div class="GameRegistration__modal" v-if="finishedMessage">
        <span>
          <!-- {{
            finishedMessage === "apply"
              ? "Спасибо за регистрацию, с вами свяжутся в ближайшее время"
              : "Произошла ошибка при регистрации, попробуйте позже"
          }} -->
          {{ finishedMessage }}
        </span>
        <button @click="finishedMessage = null"><img src="../../assets/icons/close2.svg" alt=""></button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import {
  required,
  email,
  alpha,
  min,
  length,
  image,
  size,
  mimes,
  is,
  min_value,
  numeric,
} from "vee-validate/dist/rules";
import { periodOfNumbers, takeDatePeriodes } from "./../../helpers";

import CustomSelector from "../CustomSelector.vue";
import "./style.less";
import { postRegistration, getGoods } from "../../API";

extend("lengthCode", {
  ...length,
  message: "Код состоит из 8 символов",
});

extend("mobilephone", {
  ...numeric,
  message: "Телефон должен состоять из цифр",
});

extend("required", {
  ...required,
  message: "Обязательное поле",
});
extend("email", {
  ...email,
  message: "Указан неверный адрес электронной почты",
});

extend("mimes", {
  ...mimes,
});

extend("size", {
  ...size,
  message: "Размер файла превышает выделенный лимит",
});

extend("alpha", alpha);
extend("min", min);
extend("min_value", {
  ...min_value,
  message: "Минимальная стоимость 1 рубль",
});
extend("is", {
  ...is,
  message: "Требуется соглашения с правилами",
});

extend("length", (value) => {
  let checkNumber = value !== null && value.trim();
  const re = /(\s*)?(\+)?\d{12}/;

  if (value !== null && re.test(checkNumber) && checkNumber.length === 13) {
    return true;
  }
  return `Номер в формате +37529XXXXXXX`;
});

extend("customRequired", (value, ...some) => {
  // if (this.model.shop !== null) {
  //   return true;
  // }
  return `Обязательное поле`;
});

export default {
  name: "GameRegistration",
  components: {
    ValidationProvider,
    ValidationObserver,
    CustomSelector,
  },
  props: {},

  data() {
    return {
      isLoadingData: false,
      finishedMessage: null,
      formErrors: [],
      inputErrors: {},
      countTypes: [
        { label: "1 пачка", value: 1 },
        { label: "2 пачки", value: 2 },
        { label: "3 пачки", value: 3 },
        { label: "4 пачки", value: 4 },
        { label: "5 пачек", value: 5 },
      ],
      items: [],
      rule1: false,
      rule2: false,
      forceBadRerender: true,
      months: ["апрель", "май"],
      periods: {
        май: periodOfNumbers(31),
        апрель: periodOfNumbers(30),
      },
      model: {
        name: null,
        email: null,
        surname: null,
        operator: "МТС",
        secondName: null,
        phone: null,
        phoneCode: "29",
        phoneFirst: "+375",
        year: 2021,
        day: "01",
        month: "апрель",
        post: null,
        cheque: null,
        choosedItems: [],
        file: null,
      },
    };
  },
  computed: {
    isFinishedRegistration() {
      const finishDate = new Date("2021-07-01T00:00:00");
      return finishDate < new Date();
    },
    isCorrectedPhoneNumber() {
      let checkNumber = this.model.phone !== null && this.model.phone.trim();
      const re = /(\s*)?(\+)?\d{12}/;

      return (
        this.model.phone !== null &&
        re.test(checkNumber) &&
        checkNumber.length === 13
      );
    },
    phoneConjucted() {
      const re = /(\s*)?(\+)?\d{12}/;
      const { phoneFirst, phoneCode, phone } = this.model;
      if (re.test(phoneFirst + phoneCode + phone)) {
        return phoneFirst + phoneCode + phone;
      }

      return false;
    },
    isCorrectOrderItems() {
      return !this.model.choosedItems.find(({ value }) => value === undefined);
    },
    isEmailValid() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.model.email);
    },
    isMobileSize() {
      return document.documentElement.clientWidth < 1025;
    },
    modItems() {
      return this.items.map((el) => ({ label: el.name, value: String(el.id) }));
    },
    customIsValidForm() {
      const {
        rule1,
        rule2,
        phoneConjucted,
        isCorrectOrderItems,
        isEmailValid,
        model: { name, cheque, surname, operator, file, post },
      } = this;

      return (
        rule1 &&
        rule2 &&
        isCorrectOrderItems &&
        name !== null &&
        operator !== null &&
        surname !== null &&
        !!phoneConjucted &&
        isEmailValid &&
        post !== null &&
        cheque !== null &&
        file !== null
      );
    },
  },
  methods: {
    onInput({ target }) {
      console.log(target);
      const val = target.value,
        newVal = `${Math.min(9, Math.max(0, val.slice(-1) | 0))}`;

      if (val !== newVal) {
        target.value = newVal;
        target.dispatchEvent(new Event("input"));
      }
    },
    clickFileInputImg() {
      this.$refs.fileInput.click();
    },
    phoneBlur() {
      if (this.model.phone === "+375") this.model.phone = "";
    },
    phoneClick() {
      if (this.model.phone === "" || this.model.phone === null)
        this.model.phone = "+375";
    },
    isNumber: function (evt, cost) {
      if (cost !== null && cost.includes(".") && evt.key === ".")
        evt.preventDefault();

      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isNumeric(e) {
      return false;
    },
    addItem(e) {
      e.preventDefault();
      this.model.choosedItems.push({
        count: 1,
        value: this.items[0].id,
      });
    },
    reset() {
      this.model["name"] = null;
      this.model["surname"] = null;
      this.model["secondName"] = null;
      this.model["item"] = null;
      this.model["phone"] = null;
      this.model["email"] = null;
      this.rule1 = false;
      this.rule2 = false;
      this.model["operator"] = "МТС";
      this.model["post"] = null;
      this.model["cheque"] = null;
      this.model["file"] = null;
      this.model["file_name"] = null;
      this.model["phoneCode"] = "29";
      this.model["phoneFirst"] = "+375";
      this.model["day"] = "01";
      this.model["month"] = "апрель";

      this.model.choosedItems = [
        {
          count: 1,
          value: this.items[0].id,
        },
      ];

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    customReset() {
      // console.log(this.$refs.form);
      this.$refs.form.reset();
    },
    custom(context) {
      if (context.value === "yes") {
        return {
          on: ["input"],
        };
      }

      return { on: ["change"] };
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].type !== "image/jpeg" && files[0].type !== "image/png") {
        e.target.value = null;
        this.model.file = null;
        this.model.file_name = null;
        return;
      }

      this.model.file = files[0];
      this.model.file_name = this.sliced(this.model.file.name);
    },
    sliced(value) {
      let sliced = value.slice(0, 30);
      if (sliced.length < value.length) {
        sliced += "...";
      }
      return sliced;
    },
    async onSubmit() {
      this.isLoadingData = true;
      let form = new FormData();
      const {
        model: {
          name,
          surname,
          secondName,
          phoneConjucted,
          email,
          operator,
          file,
          year,
          day,
          month,
          post,
          cheque,
          choosedItems,
        },
      } = this;

      choosedItems.forEach((item, index) => {
        form.append(`product[${index}]`, item.value);
      });
      choosedItems.forEach((item, index) => {
        form.append(`count[${index}]`, item.count);
      });
      choosedItems.forEach((item, index) => {
        form.append(`cost[${index}]`, "N/A");
      });

      form.append("name", name);
      form.append("surname", surname);
      if (secondName === null) {
        form.append("secondName", "");
      } else {
        form.append("secondName", secondName);
      }
      form.append("email", email);
      form.append("phone", phoneConjucted);
      form.append("operator", operator);
      form.append("file", file);
      form.append("purchase_date", `${day} ${month} ${year} `);
      form.append("address", post);
      form.append("check_number", cheque);

      this.reset(); // убрать при активации отправки данных

      // axios
      //   .post(postRegistration, form)
      //   .then(({ data }) => {
      //     this.finishedMessage = data.data.message;
      //     this.reset();
      //     this.forceBadRerender = false;
      //     this.isLoadingData = false;
      //     setTimeout(() => (this.forceBadRerender = true), 0);
      //   })
      //   .catch((error) => {
      //     this.isLoadingData = false;
      //     if (error.response) {
      //       this.finishedMessage = error.response.data.message;
      //     } else {
      //       this.finishedMessage = "Произошла ошибка, попробуйте позже";
      //     }
      //   });

      //example for post with checking of google
      // await this.$recaptcha("homepage").then((token) => {
      //   this.$httpService
      //     .post("participate/captcha/verify", {
      //       secret: `${process.env.VUE_APP_SECRET_SITE_KEY}`,
      //       token: token,
      //     })
      //     .then((response) => {
      //       if (response.data.success.success) {
      //         axios
      //           .post(postRegistration, form)
      //           .then(({ data }) => {
      //             this.finishedMessage = data.data.message;
      //             this.reset();
      //             this.forceBadRerender = false;
      //             this.isLoadingData = false;
      //             setTimeout(() => (this.forceBadRerender = true), 0);
      //           })
      //           .catch((error) => {
      //             this.isLoadingData = false;
      //             if (error.response) {
      //               this.finishedMessage = error.response.data.message;
      //             } else {
      //               this.finishedMessage = "Произошла ошибка, попробуйте позже";
      //             }
      //           });
      //       } else {
      //         this.$snotify.error("Похоже, что Вы - робот");
      //       }
      //     });
      // });
    },
  },
  mounted() {
    axios.post(getGoods).then(({ data }) => {
      this.items = data.data.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      this.model.choosedItems.push({
        count: 1,
        value: this.items[0].id,
      });
    });
  },
};
</script>
