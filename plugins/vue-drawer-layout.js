import Vue from 'vue'
import DrawerLayout from 'vue-drawer-layout'

const VueSelect = {
  install(Vue, options) {
    Vue.component('vue-drawer-layout', DrawerLayout)
  }
};
Vue.use(VueSelect);
export default VueSelect;
