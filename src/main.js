import Vue from 'vue';
// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// vee-validate
import {
  ValidationProvider, ValidationObserver,
  configure, localize, extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
// Icon
import Icon from 'vue-awesome/icons';
// jquery
import jquery from 'jquery';
import App from './App.vue';
import router from './router';

window.$ = jquery;

Vue.config.productionTip = false;
Vue.component('Loading', Loading);

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
localize('tw', zhTW);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('icon', Icon);

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
