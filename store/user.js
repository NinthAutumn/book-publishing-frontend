export const state = () => ({
  books: [],
  settings: {},
  theme: 'default',
  bookmarkInbox: []
})

export const getters = {

}

export const mutations = {
  USERS_BOOKS(state, books) {
    state.books = books
  },
  LOADING: (state) => {
    state.isLoading = true
  },
  LOADING_FIN: (state) => {
    state.isLoading = false
  },
  USER_SETTINGS: (state, settings) => {
    state.settings = settings
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  GET_BOOKMARK_UPDATE: (state, update) => {
    state.bookmarkInbox = update
  }
}
export const actions = {
  async getBooks({
    commit
  }, query) {
    commit('LOADING')
    await this.$axios.get(process.env.baseUrl + '/users/books').then((res) => {
      commit('USERS_BOOKS', res.data)
    })
  },
  async getSettings({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/users/settings').then((res) => {
      commit('USER_SETTINGS', res.data)
      commit('SET_THEME', res.data.theme)
    })
  },
  async setSetting({
    commit
  }, setting) {
    await this.$axios.patch(process.env.baseUrl + '/users/settings', setting).then((res) => {
      commit('USER_SETTINGS', res.data)
    })
  },
  async getBookUpdate({
    commit
  }) {
    const update = await this.$axios.get(process.env.baseUrl + '/users/bookupdate')
    commit('GET_BOOKMARK_UPDATE', update)

  }
}
