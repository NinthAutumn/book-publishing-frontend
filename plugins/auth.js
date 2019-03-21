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
  $axios.onResponse(async response => {
    if (response.status === 266) {
      const originalRequest = response.config
      originalRequest.baseURL = ''
      originalRequest._retry = true
      $axios.patch('/auth/token', {
        refresh: $auth.getRefreshToken('local')
      }).then((res) => {
        const {
          token
        } = res.data
        originalRequest.headers['Authorization'] = `Bearer ${token}`
        $auth.setToken('Bearer ' + token)
        $auth.setToken('local', 'Bearer ' + token)
        window.location.reload(true);
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
