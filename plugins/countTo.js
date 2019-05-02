import countTo from 'vue-count-to';

import Vue from 'vue'
const VueSelect = {
  install(Vue, options) {
    Vue.component('countTo', countTo)
  }
};
Vue.use(VueSelect)
