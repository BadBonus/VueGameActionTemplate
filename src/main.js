import Vue from "vue";
import App from "./App.vue";

import VueLazyload from "vue-lazyload";
// import VueSplide from "@splidejs/vue-splide"; //Вызывает поломку в ie11
import VueScrollTo from "vue-scrollto";
import VueWaypoint from "vue-waypoint";
import VueGtag from "vue-gtag";
import vco from "v-click-outside";
import VueScreenSize from "vue-screen-size";
// import HttpService from "./services/http.service"; //for recatpcha
// import { VueReCaptcha } from "vue-recaptcha-v3"; //for recatpcha

Vue.config.productionTip = false;

// Vue.use(VueSplide);
Vue.use(vco);
Vue.use(VueScrollTo);
Vue.use(VueWaypoint);
Vue.use(VueLazyload);
Vue.use(VueScreenSize);
// Vue.use(HttpService);

// Vue.use(VueGtag, {
//   config: {
//     id: "GTM-WQFW95R",
//   },
// });

// Vue.use(VueReCaptcha, {
//   siteKey: `${process.env.VUE_APP_SITE_KEY}`,
//   loaderOptions: {
//     useRecaptchaNet: true,
//   },
// });

Vue.prototype.$desktopSize = 1025;
Vue.prototype.$isMobileSize = 1025;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
