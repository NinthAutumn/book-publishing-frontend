export const state = () => ({
  books: [],
  fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif",
  theme: '',
  fontSize: 16,
  bookmarkInbox: [],
  user: {},
})

export const getters = {
  getTheme: (state) => {
    return state.theme
  },
  getFontFamily: (state) => {
    return state.fontFamily
  },
  getFontSize: (state) => {
    return state.fontSize
  },
  getUserProfile: (state) => {
    return state.user
  },
  getUserBooks: (state) => {
    return state.books
  }
}

export const mutations = {
  SET_USER_BOOKS(state, books) {
    state.books = books
  },
  LOADING: (state) => {
    state.isLoading = true
  },
  LOADING_FIN: (state) => {
    state.isLoading = false
  },
  SET_FONT_FAMILY: (state, fontFamily) => {
    state.fontFamily = fontFamily
  },
  SET_FONT_SIZE: (state, fontSize) => {
    state.fontSize = fontSize
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  GET_BOOKMARK_UPDATE: (state, update) => {
    state.bookmarkInbox = update
  },
  SET_USER_PROFILE: (state, user) => {
    state.user = user
  }
}
export const actions = {
  async getBooks({
    commit
  }, query) {
    commit('LOADING')
    try {
      const res = await this.$axios.get('/user/books')
      commit('USERS_BOOKS', res.data)
    } catch (error) {
      if (error.status) {
        console.log("dog");
      }
    }
  },
  async getSettings({
    commit
  }) {
    await this.$axios.get('/user/settings').then((res) => {
      commit('SET_FONT_FAMILY', res.data.font_family)
      commit('SET_FONT_SIZE', res.data.font_size)
      commit('SET_THEME', res.data.theme)
    })
  },
  async setSetting({
    commit
  }, setting) {
    await this.$axios.patch('/user/settings', setting).then((res) => {
      commit('SET_FONT_FAMILY', res.data.font_family)
      commit('SET_FONT_SIZE', res.data.font_size)
      commit('SET_THEME', res.data.theme)
    })
  },
  async getBookUpdate({
    commit
  }) {
    try {
      const update = await this.$axios.get('/user/bookupdate')
      commit('GET_BOOKMARK_UPDATE', update)
    } catch (error) {

    }
  },
  async fetchUser({
    commit
  }, {
    userId
  }) {
    try {
      const res = await this.$axios.get(`/user/profile?userId=${userId}`)
      commit('SET_USER_PROFILE', res.data.user)
      commit('SET_USER_BOOKS', res.data.books)
      Promise.resolve(res)
    } catch (error) {
      Promise.reject(error)
    }


  }
  // async signUpGoogle({
  //   commit
  // }){
  //   try {
  //     const update = await this.$axios.post('/auth/google')
  //     commit('GET_BOOKMARK_UPDATE', update)
  //   } catch (error) {

  //   }
  // }
}
