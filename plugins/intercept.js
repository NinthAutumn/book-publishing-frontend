import Cookies from 'js-cookie';

export default async function ({
  $axios,
  redirect,
  store,
  $auth
}) {

  $axios.onError(async error => {
    if (error.config && error.response && error.response.status === 401) {
      let token = store.getters['auth/getToken']
      if (token) {
        await store.dispatch('nauth/refresh').then(() => {
          $auth.setRefreshToken = store.getters['auth/getToken']
          return $axios(error.config)
        }).catch(async (err) => {})
      }
    }
  })

  // $axios.onResponse(async response => {
  //   console.log('suka suka suka suka suka');
  //   console.log(response.status);
  //   // return response
  //   if (response.status === 201) {
  //     await store.dispatch('auth/refresh')
  //     return response
  //   } else {
  //     return response
  //   }
  // })

}
