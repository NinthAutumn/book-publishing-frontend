import Vue from "vue"
import StarRating from 'vue-star-rating'
const VueSelect = {
  install(Vue, options) {
    Vue.component('star-rating', StarRating)
  }
};
Vue.use(VueSelect);
export default VueSelect;
