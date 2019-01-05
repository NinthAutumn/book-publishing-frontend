import Vue from 'vue'
import Cookies from 'js-cookie';
import axios from 'axios';

import {
  sync
} from 'vuex-router-sync'

export default function ({
  store,
  app: {
    router
  },
  env
}) {
  sync(store, router)
  window.onNuxtReady(() => {
    // console.log('Nuxt.js is ready and mounted', )
    const token = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  })

}






// // export default authenticationOnReload
// Vue.use(authenticationOnReload)
