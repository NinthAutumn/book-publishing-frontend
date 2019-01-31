import Vue from 'vue'
import Zondicon from 'vue-zondicons'

const VueSelect = {
  install(Vue, options) {
    Vue.component('Zondicon', Zondicon)
  }
};
Vue.use(VueSelect);
// export default VueSelect;
