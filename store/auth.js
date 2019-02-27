import Cookies from 'js-cookie';
import {
  userInfo
} from 'os';

export const state = () => ({
  userId: "",
  token: Cookies.get('token') || '',
  status: "",
  user: {},
  loggedIn: false
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
    state.user = user

    state.token = token
    state.loggedIn = true

    // state.userId = userId

  },
  AUTH_SUCCESS_USER(state, user) {},
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
    await this.$axios.post(process.env.baseUrl + '/users/login', {
      username: user.username,
      password: user.password
    }).then((res) => {
      const token = res.headers.authorization
      this.$axios.defaults.headers.common['Authorization'] = token
      Cookies.set("token", token)
      commit("AUTH_SUCCESS", {
        token: token,
        user: res.data
      });
    })

  },
  async logOut({
    commit
  }) {
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
      this.$axios.defaults.headers.common['Authorization'] = token
      Cookies.set("token", token)
      commit("AUTH_SUCCESS", {
        token: token,
        user: res.data
      });
    })
  }
}
