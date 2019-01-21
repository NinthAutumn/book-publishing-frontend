export const state = () => ({
  books: []
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

  },
}

export const mutations = {
  QUERIED_BOOKS(state, books) {
    state.books = books
  }
}
export const actions = {
  async searchBooks({
    commit
  }, query) {
    await this.$axios.get(process.env.baseUrl + '/searchBooks?query=' + query).then((res) => {
      commit('QUERIED_BOOKS', res.data)
    })
  }
}
