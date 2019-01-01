import Cookies from 'js-cookie';
import {
  userInfo
} from 'os';

export const state = () => ({
  userId: "",
  token: Cookies.get('token') || '',
  status: "",
  loggedIn: false
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
  AUTH_SUCCESS_USER(state, userId) {
    state.userId = userId
  },
  AUTH_ERROR(state) {
    state.status = 'error'
  },
  AUTH_LOGOUT(state) {
    state.loggedIn = false
  }

}

export const actions = {
  async login({
    commit,
    state
  }, user) {
    console.log("dogs")
    commit("AUTH_REQUEST")
    await this.$axios.post('http://localhost:5000/users/login', {
      username: user.username,
      password: user.password
    }).then((res) => {
      console.log(res.headers.authorization);
      console.log(res.data.userId)
      const token = res.headers.authorization
      this.$axios.defaults.headers.common['Authorization'] = token
      Cookies.set("token", token)
      commit("AUTH_SUCCESS", {
        token: token
      });
      commit("AUTH_SUCCESS_USER", {
        userId: res.data.userId
      });

      console.log(state.token)
      console.log(state.userId)
    }).catch((e) => {
      console.log(e);
    })

  },
  async logOut({
    commit,
    state
  }) {
    await this.$axios.delete('http://localhost:5000/users/logout').then((res) => {
      console.log(res.headers.authorization);
      state.userId = ""
      Cookies.remove('token')
      delete this.$axios.defaults.headers.common['Authorization']
      commit("AUTH_SUCCESS", token);
    }).catch((e) => {
      console.log(e);
    })
  }
}
