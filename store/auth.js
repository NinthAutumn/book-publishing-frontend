import Cookies from 'js-cookie';

export const state = () => ({
  token: this.$storage.getUniversal('access_token') || '',
  loggedIn: false,
  refresh_token: this.$storage.getUniversal('refresh_token') || "",
  strategy: ""
})

export const getters = {
  isAuthenticated: state => state.loggedIn,
  getStrategy: state => state.strategy,
  getAccessToken: state => state.token,
  getRefreshToken: state => state.refresh_token,
}

export const mutations = {
  SET_AUTH: (state, {
    access_token,
    refresh_token,
    strategy
  }) => {
    state.token = access_token,
      state.refresh_token = refresh_token
    state.loggedIn = true
    state.strategy = strategy
  },
  AUTH_LOGOUT(state) {
    state.loggedIn = false
    state.token = ""
    state.refresh_token = ""
  },
}

export const actions = {
  async login({
    commit,
    dispatch
  }, user) {
    try {
      const {
        data
      } = await this.$axios.post('/auth/login', {
        username: user.username,
        password: user.password
      })

      commit('SET_AUTH', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        strategy: 'local'
      })
      this.$storage.setUniversal('access_token', data.access_token)
      this.$storage.setUniversal('refresh_token', data.refresh_token)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
    } catch (error) {

    }
  },
  async logOut({
    commit
  }) {
    Cookies.remove('token')
    delete this.$axios.defaults.headers.common['Authorization']
    delete this.$axios.defaults.headers.common['']
    commit("AUTH_LOGOUT");
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
