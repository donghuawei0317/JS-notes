// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import "//at.alicdn.com/t/font_849281_df07nxswrnv.css"不支持线上的css
//引入vueswiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
//引入 vue swiper css 插件
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
