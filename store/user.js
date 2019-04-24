export const state = () => ({
  books: [],
  fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif",
  theme: '',
  fontSize: 16,
  update_view: 'grid',
  bookmarkInbox: [],
  user: {},
  reviews: [],
  comments: [],
  notification: [],
  author: {}
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
  },
  getUserComments: (state) => {
    return state.comments
  },
  getUserReviews: (state) => {
    return state.reviews
  },
  getUpdateView: (state) => {
    return state.update_view
  },
  getNotification: state => state.notification,
  isAuthor: state => {
    if (state.author) {
      return false
    } else {
      return true
    }
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
  SET_UPDATE_VIEW: (state, update_view) => {
    state.update_view = update_view
  },
  GET_BOOKMARK_UPDATE: (state, update) => {
    state.bookmarkInbox = update
  },
  SET_USER_PROFILE: (state, user) => {
    state.user = user
  },
  SET_USER_REVIEWS: (state, reviews) => {
    state.reviews = reviews
  },
  SET_USER_COMMENTS: (state, comments) => {
    state.comments = comments
  },
  SET_NOTIFICATION: (state, notification) => {
    state.notification = notification
  },
  SET_AUTHOR: async (state, author) => {
    state.author = author
  }
}
export const actions = {
  async getBooks({
    commit
  }, query) {
    commit('LOADING')
    try {
      const res = await this.$axios.get('/user/books')
      commit('SET_USER_BOOKS', res.data)
    } catch (error) {
      if (error.status) {
        console.log("dog");
      }
    }
  },
  async fetchUserSettings({
    commit
  }) {
    await this.$axios.get('/user/setting').then((res) => {
      commit('SET_FONT_FAMILY', res.data.chapterFontFamily)
      commit('SET_FONT_SIZE', res.data.chapterFontSize)
      commit('SET_THEME', res.data.chapterTheme)
      commit('SET_UPDATE_VIEW', res.data.updateDisplay)
    })
  },
  async setSetting({
    commit
  }, {
    type,
    change
  }) {
    const res = await this.$axios.patch('/user/setting', {
      type,
      change
    })
    commit('SET_FONT_FAMILY', res.data.chapterFontFamily)
    commit('SET_FONT_SIZE', res.data.chapterFontSize)
    commit('SET_THEME', res.data.chapterTheme)

    commit('SET_UPDATE_VIEW', res.data.updateDisplay)

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
      const res = await this.$axios.get(`/user/profile/books?userId=${userId}`)
      commit('SET_USER_PROFILE', res.data.user)
      commit('SET_USER_BOOKS', res.data.books)

      Promise.resolve(res)
    } catch (error) {
      Promise.reject(error)
    }
  },
  async fetchMyReviews({
    commit
  }, {
    userId
  }) {
    try {
      const res = await this.$axios.get(`/review/me`)
      commit('SET_USER_REVIEWS', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchUserReviews({
    commit
  }, {
    userId,
    authorId,
    page = 1
  }) {
    try {
      const res = await this.$axios.get(`/user/profile/reviews?userId=${userId}&author=${authorId}&page=${page}`)
      commit('SET_USER_REVIEWS', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchUserComments({
    commit
  }, {
    userId,
    page = 1
  }) {
    try {
      const res = await this.$axios.get(`/user/profile/comments?userId=${userId}&page=${page}`)
      commit('SET_USER_COMMENTS', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchNotifications({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/notification/chapter`)
      commit('SET_NOTIFICATION', res.data)
    } catch (error) {}
  },
  async fetchAuthor({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/author`)
      commit('SET_AUTHOR', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postAuthor({
    commit,
    dispatch
  }, {
    author
  }) {
    try {
      const res = await this.$axios.post(`/author`, author)
      await dispatch('fetchAuthor')
    } catch (error) {
      return Promise.reject(error)
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
