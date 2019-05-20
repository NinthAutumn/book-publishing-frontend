function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};
import Cookies from 'js-cookie'
export default async function ({
  store,
  app,
  route
}) {
  const {
    $auth,
    $axios,

  } = app
  $axios.onError(async error => {
    if (error.config && error.response && error.response.status === 401) {

      if ($auth.user.username) {
        $auth.logout()
      }
      return

    }
  })
  if (process.client) {
    const track_id = Cookies.get('track_id')
    $axios.defaults.headers.common['TrackId'] = track_id
    window.onNuxtReady(() => {
      const track_id = Cookies.get('track_id')
      $axios.defaults.headers.common['TrackId'] = track_id
    })

    if (!$auth.loggedIn) {
      return
    }
    const authStrategy = $auth.strategy.name;
    if (authStrategy === 'google' || authStrategy === 'facebook') {
      const token = $auth.getToken(authStrategy).substr(7);
      const url = `/auth/social/${authStrategy}?token=${token}`
      try {

        const {
          data
        } = await $axios.post(url);

        $auth.setRefreshToken('local', 'Bearer ' + data.refresh_token)
        $auth.setToken('Bearer ' + token)
        $auth.setToken('local', 'Bearer ' + data.access_token)
        $axios.setHeader('Authorization', 'Bearer ' + token)
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
    if ($auth.loggedIn) {
      try {
        const token = $auth.getToken('local')
        var decoded = parseJwt(token)
        let expdate = ((decoded.exp * 1000) - (Date.now()))
        await $axios.patch('/auth/token', {
          refresh: $auth.getRefreshToken('local')
        }).then((res) => {
          const tok = res.body.token
          $auth.setToken('Bearer ' + tok)
          $auth.setToken('local', 'Bearer ' + tok)
        })

        setInterval(async function () {
          await $axios.patch('/auth/token', {
            refresh: $auth.getRefreshToken('local')
          }).then((res) => {
            const {
              token
            } = res.data
            $auth.setToken('Bearer ' + token)
            $auth.setToken('local', 'Bearer ' + token)
          })
          return window.location.reload(true);
        }, expdate * 0.7);


      } catch (error) {
        console.log(error);
      }
    }


  }





}

// Properly encode data
