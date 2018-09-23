// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './vuex'
//import "//at.alicdn.com/t/font_849281_df07nxswrnv.css"不支持线上的css
//引入vueswiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
//引入 vue swiper css 插件
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

import axios from 'axios'
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ba6fc49f1d0f1653d091ba4';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
