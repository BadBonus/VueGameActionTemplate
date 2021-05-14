<template>
  <div id="app" class="app">
    <MainBlock />
    <Conditions />
    <Registration />
    <Footer />
  </div>
</template>

<script>
import Registration from "./components/GameRegistration/index";
import MainBlock from "./components/MainBlock";
import Conditions from "./components/Conditions";

import Footer from "./components/Footer";

import "reset-css";
import "animate.css";

export default {
  name: "App",
  components: { Registration, MainBlock, Footer, Conditions },
  computed: {
    isMobileSize() {
      return this.$vssWidth < this.$desktopSize;
    },
  },
};
</script>

<style lang="less">
@import "./styles/media.less";
@import "./styles/variables.less";
@import "./assets/fonts/stylesheet.css";

* {
  // transition: 0.35s;
}

#app {
  overflow: hidden;
  & > * {
    // max-width: 1440px;
    margin: auto;
  }
}

body {
  position: relative;
  // color: @main_color2;
  // font-family: "Proxima nova", "Open sans";
  // background-color: @main_color3;

  background-repeat: repeat;
  background-size: contain;
  // background-color: red;
  @media @desktop {
  }
}

b {
  font-weight: bold;
}
input,
button {
  outline: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  opacity: 1;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

//Строковые элементы

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
}

a {
  text-decoration: unset;
}

.btn {
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  // box-shadow: 0px 0px 10px #000000;
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: auto;
  &[disabled] {
    opacity: 0.35;
    cursor: not-allowed;
  }
  &[disabled]:hover {
    opacity: 0.35;
    cursor: not-allowed;
  }
  @media @desktop {
    // width: 31vw;
    // font-size: 2.35vw;
    // text-transform: none;
    // padding: 1.5vw 0;

    &:hover:not([disabled]) {
      // color: @main_color1;
      // background: #48c13c;
    }
  }
}
h2 {
  text-transform: uppercase;
  font-weight: 900;
  text-align: center;
  @media @desktop {
  }
}
</style>
