import Cookies from 'js-cookie';
const strategy = 'local'

export default function ({
  store,
  app
}) {
  const {
    $auth,
    $axios
  } = app

  if (!$auth.loggedIn || !$auth.strategies[strategy])
    return

  const options = $auth.strategies.local.options
  let token = $auth.getToken(strategy)
  let refreshToken = $auth.getRefreshToken(strategy)
  $axios.onResponse(async response => {
    console.log(response.status);
    const originalRequest = response.config
    originalRequest.baseURL = ''
    originalRequest._retry = true
    if (response.status === 266) {
      $axios.patch('/auth/token', {
        refresh: $auth.getRefreshToken('local')
      }).then((res) => {
        const {
          token
        } = res.data
        originalRequest.headers['Authorization'] = `Bearer ${token}`
        $auth.setToken('Bearer ' + token)
        $auth.setToken('local', 'Bearer ' + token)
        return $axios(originalRequest)
      })
    } else {
      return response
    }
  })
  $axios.onError(async error => {
    if (error.config && error.response && error.response.status === 401) {
      $auth.logout()
    }
  })
}

// Properly encode data
