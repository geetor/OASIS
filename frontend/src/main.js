import Vue from "vue";


import './registerServiceWorker'

import VueRouter from 'vue-router'

// LightBootstrap plugin
// import LightBootstrap from './light-bootstrap-main'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

// router setup
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts'
import jqueryForm from 'jquery-form'
import Argon from "./plugins/argon-kit"
import App from "./App.vue";
import router from "./router"
Vue.use(jqueryForm)

// plugin setup
Vue.use(VueDirectiveImagePreviewer)
Vue.prototype.$echarts = echarts //引入组件
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.use(VueRouter)
// Vue.use(LightBootstrap)
Vue.use(Argon);
Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
