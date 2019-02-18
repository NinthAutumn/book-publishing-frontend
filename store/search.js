export const state = () => ({
  books: [],
  isLoading: false
})

export const getters = {
  sortAgeASC: (state) => {

  },
  sortAgeDESC: (state) => {

  },
  sortViewASC: (state) => {

  },
  sortViewDESC: (state) => {

  },
  sortRatingASC: (state) => {

  },
  sortRatingDESC: (state) => {

  }
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
  }, query) {
    commit('LOADING')
    await this.$axios.get(process.env.baseUrl + '/searchBooks?query=' + query).then((res) => {
      commit('QUERIED_BOOKS', res.data.hits.hits)
      commit('RATING_FIX')
      commit('LOADING_FIN')
    })
  }
}
