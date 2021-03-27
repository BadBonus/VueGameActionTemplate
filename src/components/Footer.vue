<template>
  <footer class="Footer">
    <div class="Footer__mes1">
      Рекламная игра «XXX». <br />
      <b>Срок проведения:</b> с 01.04.2021 г. по 30.06.2021 г. <br />
      <b>Срок совершения покупок:</b> с 01.04.2021 г. по 31.05.2021 г.
    </div>

    <div class="Footer__mes2">
      ООО «XXX. Свидетельство о <br class="no-desktop" />
      государственной регистрации XXX от 23.02.2021 года, <br />
      выданное Министерством антимонопольного регулирования
      <br class="no-desktop" />
      и торговли Республики Беларусь. <br />
      Подробности на XXX и по телефону <b>+XXX</b>
    </div>

    <!-- <picture>
      <source
        media="(max-width:1025px)"
        srcset="./../assets/footer_stars.png"
      />

      <source
        media="(min-width:1025px)"
        srcset="./../assets/footer_stars.png"
      />
    </picture> -->
    <!-- picture не работает -->
  </footer>
</template>

<script>
export default {
  name: "Footer",
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
  .Footer {
    @media @desktop {
    }
  }
}

.Footer {
  position: relative;
  text-align: center;

  @media @desktop {
  }

  &__mes1 {
    margin-bottom: 4.1vw;

    @media @desktop {
      margin-bottom: 1.1vw;
    }
  }
}
</style>
