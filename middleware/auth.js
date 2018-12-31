import {
  routeOption
} from './utilities'

export default function (context) {
  // console.log(routerOption(context.route, 'auth', false)
  if (routeOption(context.route, 'auth', false)) {
    return
  }
  if (!context.store.state.auth.token) {
    context.redirect("/auth/login")
  }
}
