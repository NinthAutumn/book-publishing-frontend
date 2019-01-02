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
    console.log('Nuxt.js is ready and mounted', )
    const token = Cookies.get('token');
    if (token) {
      // console.log(env.baseUrl)
      axios.defaults.headers.common['Authorization'] = token;
      axios.get(env.baseUrl + '/users/show').then((res) => {
        // console.log(token);
        store.commit('auth/AUTH_SUCCESS', token);
        store.commit("auth/AUTH_SUCCESS_USER", res.data);

        // console.log(store.state.auth.userId)
      }).catch((e) => {
        console.log(e)
      })
    }
  })

}






// // export default authenticationOnReload
// Vue.use(authenticationOnReload)
