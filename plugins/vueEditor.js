import Vue from 'vue'
import {
  VueEditor
} from 'vue2-editor'

const VueSelect = {
  install(Vue, options) {
    Vue.component('vue-editor', VueEditor)
  }
};
Vue.use(VueSelect);
// export default VueSelect;
