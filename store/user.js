export const state = () => ({
  books: [],
  settings: {}
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
    })
  }
}
