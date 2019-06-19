import Loadmore from 'vue-loadmore';
import Vue from 'vue'


const VueSelect = {
  install(Vue, options) {
    Vue.component('loadmore', Loadmore);

  }
};
Vue.use(VueSelect);
// export default VueSelect;
