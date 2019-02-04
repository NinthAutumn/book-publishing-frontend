import Cookies from 'js-cookie';
import {
  serialize,
  parse
} from 'cookie'
// import {
//   stat
// } from 'fs';
// var cookieParser = require('cookie-parser');
var cookie = require('cookie');


export const state = () => ({
  counter: 0,
  menuState: "menu-active",
  dashboardMenuState: "dashboard-active",
  slidesPerView: 6.5,
  dropdownState: "dropdown-inactive",
  auth: 0,
  loginForm: false
})

export const getters = {
  getMenuState(state) {
    return state.menuState
  }
}


export const mutations = {
  SIGNUP_STATE(state) {
    state.auth = 1;
  },
  START(state) {
    state.auth = 0
  },
  LOGIN_STATE(state) {
    if (state.loginForm) {
      state.loginForm = false
    } else {
      state.loginForm = true
      state.auth = 0;
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
    if (state.dropdownState !== "dropdown-active") {
      state.dropdownState = "dropdown-active"
    } else {
      state.dropdownState = "dropdown-inactive"
    }
  },
  DROPDOWN_FALSE(state) {
    state.dropdownState = "dropdown-inactive"
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
    req
  }) {
    if (req.headers.cookie) {
      const token = cookie.parse(req.headers.cookie).token

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

      }
    }

  }
}
