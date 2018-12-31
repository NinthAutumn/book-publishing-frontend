import Vue from 'vue'
import Cookies from 'js-cookie';
import axios from 'axios'


const authenticationOnReload = function () {
  window.onNuxtReady(() => {
    console.log('Nuxt.js is ready and mounted', )
    const token = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token
      console.log(token);
    }
  })

}

// export default authenticationOnReload
Vue.use(authenticationOnReload)
