import Bars from 'vuebars'
import Vue from 'vue'

const VueSelect = {
  install(Vue, options) {
    Vue.component('bars-chart', Bars)
  }
};
Vue.use(VueSelect);
