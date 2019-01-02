import Cookies from 'js-cookie';
import {
  userInfo
} from 'os';

export const state = () => ({
  userId: "",
  token: Cookies.get('token') || '',
  status: "",
  user: "",
  loggedIn: false,

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
  AUTH_SUCCESS(state, token) {
    state.status = 'success'
    state.token = token
    state.loggedIn = true
    // console.log(userId, "dog")
    // state.userId = userId

  },
  AUTH_SUCCESS_USER(state, user) {
    console.log(user)
    state.user = user
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
    console.log("dogs")
    commit("AUTH_REQUEST")
    await this.$axios.post(process.env.baseUrl + '/users/login', {
      username: user.username,
      password: user.password
    }).then((res) => {
      console.log(res.data, "dog")
      const token = res.headers.authorization
      this.$axios.defaults.headers.common['Authorization'] = token
      Cookies.set("token", token)
      commit("AUTH_SUCCESS", {
        token: token
      });
      commit("AUTH_SUCCESS_USER", {
        user: res.data
      });
    })

  },
  async logOut({
    commit
  }) {
    await this.$axios.delete(process.env.baseUrl + '/users/logout').then((res) => {
      console.log(res.headers.authorization);
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
      commit("AUTH_SUCCESS", token);
      commit("AUTH_SUCCESS_USER", res.data)
    })
  }
}
