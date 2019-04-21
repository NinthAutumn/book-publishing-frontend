import 'intersection-observer' // for cross-browser support
import Scrollama from 'vue-scrollama'
import Vue from 'vue'
const VueSelect = {
  install(Vue, options) {
    Vue.component('scrollama', Scrollama)
  }
};
Vue.use(VueSelect)
