import uuid from 'uuid'
import atob from 'atob'

function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
};

export default async function ({
  store,
  app,
  route
}) {
  const {
    $storage,
    $axios,

  } = app


  // if (!store.getters['auth/isAuthenticated']) {
  //   return
  // }
  let token = $storage.getUniversal('access_token')
  const refresh = $storage.getUniversal('refresh_token')
  let strategy = $storage.getUniversal('strategy')
  if (token) {
    $axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    store.commit('auth/SET_AUTH', {
      refresh_token: refresh,
      access_token: token,
      strategy: strategy
    })
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['auth/isAuthenticated']) {

    try {


      let refresh_token = $storage.getUniversal('refresh_token')
      if (!refresh_token || !token) {
        return
      }
      const decoded = parseJwt(token)
      let expdate = ((decoded.exp * 1000) - (Date.now())) * 0.75
      if (expdate < 10000) {
        refreshInterval = 10000
      }

      let refresher = setInterval(async function () {
        try {
          const res = await $axios.patch('/auth/token', {
            refresh: refresh_token
          })
          let access_token = res.data.token
          store.commit('auth/SET_AUTH', {
            refresh_token,
            access_token,
            strategy: strategy
          })
          $storage.setUniversal('access_token', access_token)
          $axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        } catch (error) {
          // store.commit('auth/')
          throw new Error('トークンの再生に失敗した')
          // refresher.close()
        }

      }, expdate);

    } catch (error) {
      console.log(error);
    }





  }
  let track_id = $storage.getUniversal('track_id')
  if (!track_id) {
    track_id = uuid()
    $storage.setUniversal('track_id', track_id)
  }

  $axios.defaults.headers.common['TrackId'] = track_id




  // $storage
  // if (process.client) {
  //   const track_id = Cookies.get('track_id')
  //   $axios.defaults.headers.common['TrackId'] = track_id
  //   window.onNuxtReady(() => {
  //     const track_id = Cookies.get('track_id')
  //     $axios.defaults.headers.common['TrackId'] = track_id
  //   })

  //   if (!$auth.loggedIn) {
  //     return
  //   }
  //   const authStrategy = $auth.strategy.name;
  //   if (authStrategy === 'google' || authStrategy === 'facebook') {
  //     const token = $auth.getToken(authStrategy).substr(7);
  //     const url = `/auth/social/${authStrategy}?token=${token}`
  //     try {
  //       const {
  //         data
  //       } = await $axios.post(url);

  //       $auth.setRefreshToken('local', 'Bearer ' + data.refresh_token)
  //       $auth.setToken('Bearer ' + token)
  //       $auth.setToken('local', 'Bearer ' + data.access_token)
  //       $axios.setHeader('Authorization', 'Bearer ' + token)
  //       setTimeout(async () => {
  //         $auth.setStrategy('local');
  //         setTimeout(async () => {
  //           await $auth.fetchUser();
  //         })
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   if ($auth.loggedIn) {
  //     try {
  //       const token = $auth.getToken('local')
  //       var decoded = parseJwt(token)
  //       let expdate = ((decoded.exp * 1000) - (Date.now()))
  //       await $axios.patch('/auth/token', {
  //         refresh: $auth.getRefreshToken('local')
  //       }).then((res) => {
  //         const tok = res.body.token
  //         // $auth.setToken('Bearer ' + tok)
  //         // $auth.setToken('local', 'Bearer ' + tok)
  //       })

  //       setInterval(async function () {
  //         await $axios.patch('/auth/token', {
  //           refresh: $auth.getRefreshToken('local')
  //         }).then((res) => {
  //           const {
  //             token
  //           } = res.data
  //           $auth.setToken('Bearer ' + token)
  //           $auth.setToken('local', 'Bearer ' + token)
  //         })
  //         return window.location.reload(true);
  //       }, expdate * 0.7);


  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }





}

// Properly encode data
