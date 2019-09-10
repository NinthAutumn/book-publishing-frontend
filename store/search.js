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
  },
  PUSH_BOOKS: (state, books) => {
    books.forEach((book) => {
      state.books.push(book)
    })
  },
  RESET_BOOKS(state) {
    state.books = []
  }
}
export const actions = {
  async searchBooks({
    commit
  }, {
    query,
    page = 1,
    limit = 10,
    infinite = false
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/book/show/search?search=${query}&page=${page}&limit=${limit}`)
      // console.log(data);
      if (!infinite) {
        commit('QUERIED_BOOKS', data)
      } else {
        commit('PUSH_BOOKS', data)
      }
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }


  }
}
