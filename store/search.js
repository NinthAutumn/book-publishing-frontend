export const state = () => ({
  books: [],
  isLoading: false
})

export const getters = {
  getBookList: state => state.books
}

export const mutations = {
  QUERIED_BOOKS(state, books) {
    state.books = books
  },
  RATING_FIX(state) {
    state.books.forEach(async (book) => {
      book.ratings = +book.ratings.toFixed(2)
    })
  },
  LOADING: (state) => {
    state.isLoading = true
  },
  LOADING_FIN: (state) => {
    state.isLoading = false
  }
}
export const actions = {
  async searchBooks({
    commit
  }, {
    query,
    page = 1,
    limit = 10
  }) {
    commit('LOADING')
    await this.$axios.get(`/v2/book/show/search?search=${query}&page=${page}`).then((res) => {

      commit('QUERIED_BOOKS', res.data)

      // commit('RATING_FIX')
      commit('LOADING_FIN')
    })
  }
}
