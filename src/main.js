import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/api/';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
