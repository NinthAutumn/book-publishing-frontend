import Vue from 'vue'
import {
  Cropper,
  CircleStencil
} from 'vue-advanced-cropper'

const VueSelect = {
  install(Vue, options) {
    Vue.component('CircleStencil', CircleStencil)
    Vue.component('Cropper', Cropper)
  }
};
Vue.use(VueSelect)
