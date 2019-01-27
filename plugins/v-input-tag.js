import InputTag from 'vue-input-tag'
import Vue from 'vue'

const VueSelect = {
  install(Vue, options) {
    Vue.component('input-tag', InputTag)
  }
};
Vue.use(VueSelect);
// export default VueSelect;
