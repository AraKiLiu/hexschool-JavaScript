import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import 'vue-loading-overlay/dist/vue-loading.css';
import Icon from 'vue-awesome/icons';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.component('Loading', Loading);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('icon', Icon);

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
