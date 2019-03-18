// import Cookies from 'js-cookie';
// const strategy = 'local'

// export default function ({
//   store,
//   $axios,
//   app
// }) {
//   const {
//     $auth
//   } = app

//   if (!$auth.loggedIn || !$auth.strategies[strategy])
//     return

//   const options = $auth.strategies.local.options
//   let token = $auth.getToken(strategy)
//   let refreshToken = $auth.getRefreshToken(strategy)

//   if (!token || !refreshToken)
//     return

//   // calculate timeout before token expiration (75% from expiration time)

//   // Limit 10 seconds (avoid self attack)


//   // keep refreshing token before expiration time
//   let refresher = setInterval(async function () {
//     try {
//       const response = await $axios.post(options.access_token_endpoint,

//       )

//       token = options.token_type + ' ' + response.data.access_token
//       refreshToken = options.token_type + ' ' + response.data.refresh_token

//       $auth.setToken(strategy, token)
//       $auth.setRefreshToken(strategy, refreshToken)
//       $axios.setToken(token)
//     } catch (error) {
//       $auth.logout()
//       throw new Error('Erro while refreshing token')
//     }
//   }, refreshInterval)
// }

// // Properly encode data 


// // $axios.onError(async error => {
// //   if (error.config && error.response && error.response.status === 401) {
// //     let token = store.getters['auth/getToken']
// //     if (token) {
// //       await store.dispatch('nauth/refresh').then(() => {
// //         $auth.setRefreshToken = store.getters['auth/getToken']
// //         return $axios(error.config)
// //       }).catch(async (err) => {})
// //     }
// //   }
// // })

// // $axios.onResponse(async response => {
// //   console.log('suka suka suka suka suka');
// //   console.log(response.status);
// //   // return response
// //   if (response.status === 201) {
// //     await store.dispatch('auth/refresh')
// //     return response
// //   } else {
// //     return response
// //   }
// // })
