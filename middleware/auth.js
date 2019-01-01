import {
  routeOption
} from './utilities'
import Cookies from 'js-cookie';


export default function (ctx) {
  // context.store.state.auth.token = 
  // context.store.commit("auth/AUTH_SUCCESS", {
  //   token: Cookies.get("token")
  // })
  // context.store.commit("auth/AUTH_SUCCESS_USER", {
  //   token: Cookies.get("token")
  // })
  // console.log(routerOption(context.route, 'auth', false)


  // if (!Cookies.get("token")) {
  //   context.redirect("/auth/login")
  // }

  // ctx.beforeNuxtRender(({params}) => {

  // })

  if (routeOption(ctx.route, 'auth', false)) {
    return
  }

  if (ctx.store.state.auth.loggedIn) {
    // -- Authorized --
    // Redirect to home page if inside login page (or login page disabled)
    // if (!login || normalizePath(ctx.route.path) === normalizePath(login)) {
    //   ctx.app.$auth.redirect('home')
    // }

  } else {
    // -- Guest --
    // Redirect to login page if not authorized and not inside callback page
    // (Those passing `callback` at runtime need to mark their callback component
    // with `auth: false` to avoid an unnecessary redirect from callback to login)
    ctx.redirect('/auth/login')
  }
}
