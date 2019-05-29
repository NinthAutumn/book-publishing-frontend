export default function ({
  store,
  $axios,
  app,
}) {
  $axios.onRequest(config => {
    config.headers['Access-Control-Allow-Origin'] = "*";
  })
  if (process.client) {
    $axios.onError(async error => {
      if (error.config && error.response && error.response.status === 401) {
        return store.dispatch('auth/logout')
      }
    })
  }

}
