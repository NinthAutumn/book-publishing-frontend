export const state = () => ({
  books: [],
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
  }
}
export const actions = {
  async getBooks({
    commit
  }, query) {
    commit('LOADING')
    await this.$axios.get(process.env.baseUrl + '/users/books').then((res) => {
      // console.log(res.data);
      commit('USERS_BOOKS', res.data)
    })
  }
}
