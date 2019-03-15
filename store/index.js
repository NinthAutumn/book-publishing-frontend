import Cookies from 'js-cookie';
import uuid from 'uuid'
import {
  serialize,
  parse
} from 'cookie'
var cookie = require('cookie');


export const state = () => ({
  counter: 0,
  menuState: "menu-active",
  dashboardMenuState: "dashboard-active",
  dropdownState: false,
  authed: 0,
  loginForm: false,

})

export const getters = {
  getMenuState(state) {
    return state.menuState
  }
}


export const mutations = {
  SIGNUP_STATE(state) {
    state.authed = 1;
  },

  START(state) {
    state.authed = 0
  },
  LOGIN_STATE(state) {
    if (state.loginForm) {
      state.loginForm = false
    } else {
      state.loginForm = true
      state.authed = 0;
    }
  },
  LOGIN_FALSE(state) {
    state.loginForm = false
  },
  increment(state) {
    state.counter++
  },
  menuStateChange(state) {
    if (state.menuState != "menu-active") {
      state.menuState = "menu-active";
      state.slidesPerView = 7
    } else {
      state.menuState = "menu-inactive";
      state.slidesPerView = 9
    }
  },
  DROPDOWN_STATE(state) {
    state.dropdownState = !state.dropdownState
  },
  DROPDOWN_FALSE(state) {
    state.dropdownState = false
  },
  DASHBOARD_MENU_STATE_CHANGE(state) {
    if (state.dashboardMenuState === "dashboard-active") {
      state.dashboardMenuState = "dashboard-inactive"
    } else {
      state.dashboardMenuState = "dashboard-active"
    }

  }
}


export const actions = {
  async nuxtServerInit({
    commit,
    state
  }, {
    req,
    res
  }) {
    if (req.headers.cookie) {
      const token = cookie.parse(req.headers.cookie).token
      const track_id = cookie.parse(req.headers.cookie).track_id
      if (!track_id) {
        const id = uuid()
        res.setHeader('Set-Cookie', [serialize('track_id', id)])
        this.$axios.defaults.headers.common['TrackId'] = id
      } else {
        this.$axios.defaults.headers.common['TrackId'] = track_id
      }

      if (token) {
        this.$axios.defaults.headers.common['Authorization'] = token;
        await this.$axios.get(process.env.baseUrl + '/users/show').then((res) => {
          commit('auth/AUTH_SUCCESS', {
            token: token,
            user: res.data
          });
        }).catch((e) => {
          console.log(e)
        })

      } else {
        commit('auth/AUTH_LOGOUT')
      }
    }

  }
}
