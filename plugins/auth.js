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
    $axios
  } = app
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
    await store.dispatch('auth/fetchUser')
  }
  if (process.client) {
    if (store.getters['auth/isAuthenticated']) {
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
          console.log(error);
          throw new Error('トークンの再生に失敗した')
        }

      }, expdate);
    }
  }
  let track_id = $storage.getUniversal('track_id')
  if (!track_id) {
    track_id = uuid()
    $storage.setUniversal('track_id', track_id)
  }

  $axios.defaults.headers.common['TrackId'] = track_id


}

// Properly encode data
