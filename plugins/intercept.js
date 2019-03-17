import Cookies from 'js-cookie';

export default async function ({
  $axios,
  redirect,
  store
}) {

  // $axios.onError(async error => {
  //   if (error.config && error.response && error.response.status === 401) {
  //     const token = Cookies.get('token');

  //     if (token) {
  //       await store.dispatch('auth/refresh').then(() => {
  //         console.log(store.getters['auth/getToken']);
  //         error.config.headers.authorization = store.getters['auth/getToken']
  //         return $axios(config)
  //       }).catch(async (err) => {
  //         await store.dispatch('auth/refresh').then(() => {
  //           console.log(store.getters['auth/getToken']);
  //           error.config.headers.authorization = store.getters['auth/getToken']
  //           return $axios(config)
  //         }).catch((err) => {

  //         })
  //       })
  //     }
  //   }
  // })

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
