import DatePicker from 'vue2-datepicker'

import Vue from 'vue'

const VueSelect = {
  install(Vue, options) {
    Vue.component('date-picker', DatePicker)
  }
};
Vue.use(VueSelect);
// export default VueSelect;
