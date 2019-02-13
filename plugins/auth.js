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
    const track_id = Cookies.get('track_id')
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
    axios.defaults.headers.common['TrackId'] = track_id

  })

}






// // export default authenticationOnReload
// Vue.use(authenticationOnReload)
