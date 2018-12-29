import Cookies from 'js-cookie';
import {
  userInfo
} from 'os';

export const state = () => ({
  userId: "",
  token: Cookies.get('token') || '',
  status: "",
  username: "admin1",
  password: "admin1"
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
  },
  AUTH_ERROR(state) {
    state.status = 'error'
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
      const token = res.headers.authorization
      this.$axios.defaults.headers.common['Authorization'] = token
      Cookies.set("token", token)
      commit("AUTH_SUCCESS", token);
    }).catch((e) => {
      console.log(e);
    })

  }
}
