<template>
  <div :class="{ CustomSelector: true, active: open }">
    <!-- <label v-if="label" class="form__label">{{ label }}</label> -->
    <!-- <input
      :type="type"
      :value="value"
      @input="updateValue"
      @change="updateValue"
      @blur="$emit('blur')"
      :disabled="disabled"
      :class="{ input: true, input__error: !!error }"
    /> -->
    <div
      class="CustomSelector__choosedOption"
      @blur="blur"
      @click="openList"
      tabindex="0"
      :style="{
        color: this.placeholder === choosedName ? '#FF5DA2' : '#FF5DA2',
      }"
    >
      <span class="CustomSelector__choosedOptionName"> {{ choosedName }}</span>
      <div class="CustomSelector__pointer">
        <img class="" src="../assets/icons/triangle.svg" alt="triangle" />
      </div>
    </div>
    <ul class="CustomSelector__options" v-if="open" v-click-outside="toggleDropdown">
      <li
        @click="chooseOption(option)"
        v-for="option in options"
        :key="typeof option === 'object' ? option.value : option"
      >
        <span class="CustomSelector__optionsLabel">
          {{ typeof option === "object" ? option.label : option }}
        </span>
      </li>
    </ul>
    <transition name="slide">
      <p v-if="errors" class="form__error">{{ errors[0] }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    choosedName: function () {
      let name = this.placeholder ? this.placeholder : "click";
      if (this.value) {
        if (typeof this.options[0] === "object") {
          name = this.options.find((el) => String(el.value) === String(this.value)).label;

          if (this.maxLetters && name.length > this.maxLetters)
            name = name.slice(0, this.maxLetters) + "...";
        } else {
          name = this.value;
          if (this.maxLetters && name.length > this.maxLetters)
            name = name.slice(0, this.maxLetters) + "...";
        }
      }

      return name;
    },
  },
  $_veeValidate: {
    name() {
      return this.label;
    },
    value() {
      return this.value;
    },
  },
  props: {
    value: [String, Number],
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      required: false,
    },
    options: {
      type: Array,
    },
    maxLetters: {
      type: Number,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    },
    chooseOption(option) {
      this.open = false;
      this.$emit("input", typeof option === "object" ? String(option.value) : String(option));
    },
    toggleDropdown() {
      this.open = false;
    },
    openList() {
      this.open = true;
    },
    blur() {
      this.$emit("blur");
    },
  },
  created() {
    // var vm = this;
    // document.addEventListener("click", function () {
    //   vm.toggleDropdown();
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../styles/media.less";
@import "../styles/variables.less";

.CustomSelector {
  border: 1px solid red;
  width: 100%;
  z-index: 10;
  cursor: pointer;
  &__choosedOption {
    outline: none;
    display: flex;
    align-items: center;
    padding-left: 1vw;
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__options {
    cursor: pointer;
    li {
      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
      }
      &:first-child {
        // border-radius: 8px 8px 0 0;
      }

      &:last-child {
        // border-radius: 0 0 8px 8px;
      }
    }
  }

  &__pointer {
    position: absolute;
    right: 1.8vw;
    width: 5.3vw;
    height: 9.9vw;
    top: 0.1vw;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    background: @main_color1;
    display: flex;
    img {
      width: 50%;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    @media @desktop {
      right: 1.1vw;
      width: 1.8vw;
      height: 2.7vw;
      top: 0;
    }
  }
  &.active {
    .CustomSelector__pointer {
      transform: rotate(180deg);
    }
  }
}
</style>
