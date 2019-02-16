import Vue from 'vue'

import truncate from 'vue-truncate-collapsed';

const VueSelect = {
  install(Vue, options) {
    Vue.component('truncate', truncate)
  }
};
Vue.use(VueSelect);
// export default VueSel
