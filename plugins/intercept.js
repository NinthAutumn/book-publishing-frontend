import Cookies from 'js-cookie';

export default async function ({
  $axios,
  redirect,
  store
}) {

  $axios.onError(async error => {
    if (error.config && error.response && error.response.status === 401) {
      const token = Cookies.get('token');

      if (token) {
        console.log(error.config);
        await store.dispatch('auth/refresh').then(() => {
          console.log(store.getters['auth/getToken']);
          error.config.headers.authorization = store.getters['auth/getToken']
          return $axios(config)
        }).catch((err) => {
          redirect('/')
        })
      }
    }
  })

  // $axios.onResponse(async response => {
  //   console.log('suka suka suka suka suka');
  //   console.log(response.status);
  //   if (response.status === 401) {
  //     console.log("suka suka suka suka");
  //     const originalRequest = response.config
  //     originalRequest.baseURL = ''
  //     originalRequest._retry = true
  //     await store.dispatch('auth/refresh').then(() => {
  //       originalRequest.headers['Authorization'] = store.getters['auth/getToken']
  //       return $axios(originalRequest)
  //     }).catch((err) => {
  //       redirect('/')
  //     })


  //   } else {
  //     return response
  //   }
  // })

}
