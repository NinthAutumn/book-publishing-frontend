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
  signUpForm: ''
})

export const getters = {
  getMenuState(state) {
    return state.menuState
  }
}


export const mutations = {
  SIGNUP_STATE(state) {
    if (state.signUpForm) {
      state.signUpForm = ''
    } else {
      state.signUpForm = 'active'
    }
  },
  SIGNUP_FALSE(state) {
    state.signUpForm = ''
  },
  increment(state) {
    state.counter++
  },
  menuStateChange(state) {
    // console.log("dogss")
    if (state.menuState != "menu-active") {
      state.menuState = "menu-active";
      state.slidesPerView = 7
    } else {
      state.menuState = "menu-inactive";
      state.slidesPerView = 9
    }
    // console.log(state.menuState)
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
    console.log("claled")
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
    // console.log("serverinit")
    if (req.headers.cookie) {
      const token = cookie.parse(req.headers.cookie).token

      // parsed = cookieparser.parse(req.headers.cookie);
      // console.log()

      if (token) {
        // console.log(env.baseUrl)
        this.$axios.defaults.headers.common['Authorization'] = token;

        await this.$axios.get(process.env.baseUrl + '/users/show').then((res) => {
          // console.log(token);
          // commit("auth/AUTH_SUCCESS_USER", );
          // console.log(state.auth.user._id)
          commit('auth/AUTH_SUCCESS', {
            token: token,
            user: res.data
          });
          // console.log(store.state.auth.userId)
        }).catch((e) => {
          console.log(e)
        })

      }
    }

  }
}
