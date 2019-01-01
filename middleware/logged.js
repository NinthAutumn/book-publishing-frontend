import {
  routeOption
} from './utilities'
import Cookies from 'js-cookie'
export default function ({
  store,
  redirect,
  route
}) {
  if (routeOption(route, 'auth', false)) {
    return
  }
  if (route.query.id) {
    return
  }
  // If the user is not authenticated
  if (!Cookies.get('token')) {
    return redirect('/auth/login')
  }

}
