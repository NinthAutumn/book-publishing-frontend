import Cookies from 'js-cookie';
const strategy = 'local'

function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};
export default async function ({
  store,
  app
}) {
  const {
    $auth,
    $axios
  } = app

  if (process.client) {
    const token = $auth.getToken('local', )
    if ($auth.loggedIn) {
      try {
        var decoded = parseJwt(token)
        let expdate = ((decoded.exp * 1000) - (Date.now()))
        await $axios.patch('/auth/token', {
          refresh: $auth.getRefreshToken('local')
        }).then((res) => {
          const {
            token
          } = res.data
          $auth.setToken('Bearer ' + token)
          $auth.setToken('local', 'Bearer ' + token)
        })

        setInterval(async function () {
          await $axios.patch('/auth/token', {
            refresh: $auth.getRefreshToken('local')
          }).then((res) => {
            const {
              token
            } = res.data
            console.log(token);
            $auth.setToken('Bearer ' + token)
            $auth.setToken('local', 'Bearer ' + token)
          })
          window.location.reload(true);
        }, expdate * 0.7);


      } catch (error) {
        console.log(error);
      }
    }

    const authStrategy = $auth.strategy.name;
    if (authStrategy === 'google') {
      const token = $auth.getToken(authStrategy).substr(7);
      const url = '/auth/google'
      try {
        const {
          data
        } = await $axios.post(url, {
          token
        });
        $auth.setRefreshToken('local', data.refresh_token)
        $auth.setToken('local', data.access_token);
        setTimeout(async () => {
          $auth.setStrategy('local');
          setTimeout(async () => {
            await $auth.fetchUser();
          })
        });
      } catch (e) {
        console.log(e);
      }
    }
  }



  // $axios.onResponse(async response => {
  //   if (response.status === 266) {
  //     const originalRequest = response.config
  //     originalRequest.baseURL = ''
  //     originalRequest._retry = true
  //     $axios.patch('/auth/token', {
  //       refresh: $auth.getRefreshToken('local')
  //     }).then((res) => {
  //       const {
  //         token
  //       } = res.data
  //       originalRequest.headers['Authorization'] = `Bearer ${token}`
  //       $auth.setToken('Bearer ' + token)
  //       $auth.setToken('local', 'Bearer ' + token)
  //       window.location.reload(true);
  //       return $axios(originalRequest)
  //     })
  //   } else {
  //     return response
  //   }
  // })
  $axios.onError(async error => {
    if (error.config && error.response && error.response.status === 401) {
      $auth.logout()
    }
  })
}

// Properly encode data
