import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import moment from 'moment';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

/**
 * Globablly available vue filter for formatting dates
 */
Vue.filter('date', value => {
  if (!value) return '';
  return moment(value).format('MMM D, YYYY (ddd)');
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
