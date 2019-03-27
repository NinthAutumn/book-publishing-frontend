import Cookies from 'js-cookie';

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
  },
  getToken: (state) => {
    return state.token
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
    const thirty = 1 / 48
    await this.$axios.post('/auth/login', {
      username: user.username,
      password: user.password
    }).then((res) => {
      try {
        // commit("AUTH_SUCCESS", {
        //   token: token,
        //   user: res.data
        // });

        return res.data
      } catch (error) {
        return null
      }
    })

  },
  async logOut({
    commit
  }) {
    Cookies.remove('token')
    delete this.$axios.defaults.headers.common['Authorization']
    commit("AUTH_LOGOUT");
    // await this.$axios.delete(process.env.baseUrl + '/users/logout').then((res) => {

    // }).catch((e) => {
    //   console.log(e);
    // })
  },
  async signUp({
    commit
  }, user) {
    await this.$axios.post('/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }).then((res) => {
      const token = res.headers.authorization
      this.$axios.defaults.headers.common['Authorization'] = token

    })
  },
  async refresh({
    commit,
    state,
    dispatch
  }) {
    try {
      const res = await this.$axios.get('/auth/token')
      const token = res.headers.authorization
      if (token) {
        this.$axios.defaults.headers.common['Authorization'] = token
        this.$axios.defaults.headers.common['refresh'] = refresh
        Cookies.set("token", token)
        Cookies.set("refresh", refresh)
        commit("AUTH_SUCCESS", {
          token: token,
          user: res.data
        });
      } else {
        dispatch('logOut')
      }

    } catch (error) {
      console.log(error);
    }
  }
}
