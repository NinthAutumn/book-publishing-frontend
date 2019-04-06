import Vue from 'vue'
import UploadButton from 'vuetify-upload-button';


const VueSelect = {
  install(Vue, options) {
    Vue.component('upload-btn', UploadButton)
  }
};
Vue.use(VueSelect);
// export default VueSelect;
