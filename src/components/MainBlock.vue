<template>
  <div class="MainBlock">main block 1</div>
</template>

<script>
export default {
  name: "MainBlock",
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
  .MainBlock {
    @media @desktop {
    }
  }
}

.MainBlock {
  position: relative;
  @media @desktop {
  }
}
</style>
