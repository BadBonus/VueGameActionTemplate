<template>
  <div class="Conditions">
    <h2>Условия участия</h2>
    <ul class="Conditions__list">
      <li>
        <img src="./../assets/icons/test.svg" alt=" " />
        <div class="Conditions__listTextBlock">
          <h4>Купи Дороже, Продай дешевле!</h4>
          <p>Я ничего не напутал?</p>
        </div>
      </li>
      <li>
        <img src="./../assets/icons/test2.svg" alt=" " />
        <div class="Conditions__listTextBlock">
          <h4>Регистрируйся</h4>
          <p>Без вопросов</p>
        </div>
      </li>
      <li>
        <img src="./../assets/icons/test3.svg" alt=" " />
        <div class="Conditions__listTextBlock">
          <h4>Напряги удачу</h4>
          <p>Она тебе точно понадобиться</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Conditions",
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    isMobileSize() {
      return this.$vssWidth < this.$desktopSize;
    },
  },
  methods: {},
};
</script>

<style lang="less">
@import "../styles/media.less";

@-moz-document url-prefix() {
  .Conditions {
    @media @desktop {
    }
  }
}

.Conditions {
  .Conditions__list {
    @media @desktop {
    }

    justify-content: space-between;
    @media @desktop {
      display: flex;
    }

    li {
      text-align: center;
      @media @desktop {
      }

      &:nth-of-type(1) {
        @media @desktop {
        }
      }
      &:nth-of-type(2) {
        @media @desktop {
        }
      }
      &:nth-of-type(3) {
        @media @desktop {
        }
      }

      img {
        width: 10vw;
        @media @desktop {
        }
      }
    }
  }
  .Conditions__listTextBlock {
    text-align: center;
  }
}
</style>
