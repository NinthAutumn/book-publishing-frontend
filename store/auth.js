import Cookies from 'js-cookie';

export const state = () => ({
  token: '',
  loggedIn: false,
  refresh_token: "",
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
    state.token = access_token
    state.refresh_token = refresh_token
    state.loggedIn = true
    state.strategy = strategy
  },
  AUTH_LOGOUT(state) {
    state.loggedIn = false
    state.token = ""
    state.refresh_token = ""
    state.strategy = ""
  },
}

export const actions = {
  async login({
    commit,
    dispatch
  }, {
    user,
    strategy
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/auth/login', {
        username: user.username,
        password: user.password
      })
      if (data.error) {
        return Promise.reject(data.error)
      }
      commit('SET_AUTH', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        strategy: strategy
      })

      this.$storage.setUniversal('access_token', data.access_token)
      this.$storage.setUniversal('refresh_token', data.refresh_token)
      this.$storage.setUniversal('strategy', strategy)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
      return Promise.resolve({
        error: null
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async socialAuth({
    commit
  }, {
    strategy,
    token
  }) {
    try {
      const {
        data
      } = await this.$axios.post(`/auth/social/${strategy}?token=${token}`)
      commit('SET_AUTH', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        strategy: strategy
      })
      this.$storage.setUniversal('access_token', data.access_token)
      this.$storage.setUniversal('refresh_token', data.refresh_token)
      this.$storage.setUniversal('strategy', strategy)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
      this.$router.go(0)
    } catch (error) {
      return Promise.reject(error)
    }

    // accessToken/idToken

  },
  async logout({
    commit
  }) {
    if (process.client) {
      this.$storage.removeUniversal('access_token')
      this.$storage.removeUniversal('refresh_token')
      this.$storage.removeUniversal('strategy')
      delete this.$axios.defaults.headers.common['Authorization']
      commit("AUTH_LOGOUT");
      this.$router.go(0)
    }

  },
  async signup({
    commit
  }, {
    user
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/auth/signup', {
        username: user.username,
        email: user.email,
        password: user.password
      })
      let error = data.error
      if (error) {
        if (error.errors[0].message === 'email must be unique') {
          error = `この、${user.email} Eメールはもう使われています`
        } else if (error.errors[0].message === 'username must be unique') {
          error = `${user.username} はもう使われています`
        } else {
          error = `アカウント作成に失敗しました`
        }
        return Promise.resolve({
          error: error
        })
      }
      return Promise.resolve({
        error: null
      })
    } catch (error) {


    }

  },
  async setPassword({
    commit
  }, {
    password,
    token
  }) {
    try {
      const {
        data
      } = await this.$axios.patch('/auth/setPassword', {
        password,
        token
      })
      if (data.error) {
        return Promise.reject(data.error)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async resendEmail({
    commit
  }, {
    email
  }) {
    try {
      const {
        data
      } = await this.$axios.patch('/auth/resend', {
        email
      })
      if (data.error) {
        return Promise.reject(data.error)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async setPasswordToken({
    commit,
    state
  }, {
    email
  }) {
    try {
      const {
        data
      } = await this.$axios.patch('/auth/forgot', {
        email
      })
      if (data.error) {
        return Promise.reject(data.error)
      }
      return Promise.resolve()

    } catch (error) {
      return Promise.reject(error)
    }

  },
  async refresh({
    commit,
    state,
    dispatch
  }) {
    try {
      // const res = await this.$axios.get('/auth/token')
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
