const routeOption = (route, key, value) => {
  return route.matched.some(m => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        component => component.options && component.options[key] === value
      )
    } else {
      // SSR
      return Object.values(m.components).some(component =>
        Object.values(component._Ctor).some(
          ctor => ctor.options && ctor.options[key] === value
        )
      )
    }
  })
}
export function normalizePath(path = '') {
  // Remove query string
  let result = path.split('?')[0]

  // Remove redundant / from the end of path
  if (result.charAt(result.length - 1) === '/') {
    result = result.slice(0, -1)
  }

  return result
}

export default function ({
  store,
  redirect,
  route,
  app
}) {
  if (routeOption(route, 'auth', false)) {
    return
  }
  const redirectSSL = require('redirect-ssl')

  // Add middleware
  app.use(redirectSSL)
  if (!store.state.auth.loggedIn) {
    // console.log(app);
    // app.$toast.show('アカウントが必要です', {
    //   duration: 1000,
    //   theme: 'toasted-primary',
    //   position: 'top-right'
    // })
    return redirect('/')
  }

}
