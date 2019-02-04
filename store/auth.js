import Cookies from 'js-cookie';
import {
  userInfo
} from 'os';

export const state = () => ({
  userId: "",
  token: Cookies.get('token') || '',
  status: "",
  user: {},
  loggedIn: false,
  signupForm: false,
  loginForm: false
  // library:
  // username: "admin1",
  // password: "admin1"
})

export const getters = {
  isAuthenticated: (state) => {
    return !!state.token
  },
  authStatus: (state) => {
    return state.status
  }
}

export const mutations = {

  AUTH_REQUEST(state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, {
    token,
    user
  }) {
    state.status = 'success'
    state.user = user

    state.token = token
    state.loggedIn = true

    // state.userId = userId

  },
  AUTH_SUCCESS_USER(state, user) {

    // state.menus[4].link = "/library/?id=" + state.user._id
  },
  AUTH_ERROR(state) {
    state.status = 'error'
  },
  AUTH_LOGOUT(state) {
    state.loggedIn = false
    state.user = ""
    state.token = ""
  }

}

export const actions = {
  async login({
    commit,
    state
  }, user) {
    // console.log("dogs")
    commit("AUTH_REQUEST")
    await this.$axios.post(process.env.baseUrl + '/users/login', {
      username: user.username,
      password: user.password
    }).then((res) => {
      // commit("AUTH_SUCCESS_USER", {
      //   user: res.data
      // });
      const token = res.headers.authorization
      commit("AUTH_SUCCESS", {
        token: token,
        user: res.data
      });
      this.$axios.defaults.headers.common['Authorization'] = token

      Cookies.set("token", token)
      // Cookies.set('user', res.data)

    })

  },
  async logOut({
    commit
  }) {
    // console.log();
    // this.$axios.defaults.headers.common['Authorization'] = Cookies.get('token')
    await this.$axios.delete(process.env.baseUrl + '/users/logout').then((res) => {
      Cookies.remove('token')
      delete this.$axios.defaults.headers.common['Authorization']
      commit("AUTH_LOGOUT");
    }).catch((e) => {
      console.log(e);
    })
  },
  async signUp({
    commit
  }, user) {
    await this.$axios.post(process.env.baseUrl + '/users/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }).then((res) => {
      const token = res.headers.authorization
      commit("AUTH_SUCCESS", {
        token: token,
        user: res.data
      });
      this.$axios.defaults.headers.common['Authorization'] = token

      Cookies.set("token", token)
      // commit("AUTH_SUCCESS_USER", )
    })
  }
}
