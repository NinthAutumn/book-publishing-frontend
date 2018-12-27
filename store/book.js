export const state = () => ({
  books: {}
})

export const getters = {
  isHighRated: (state) => {
    let goodBook = state.filter((book) => {
      book.rating > 4
    });
    return goodBook
  },
  isTrending: (state) => {

  }
}

export const actions = {
  async addBook({
    commit
  }, book) {
    commit('add', book)
  },
  async editBook({
    commit
  }) {

  },
  async deleteBook({
    commit
  }) {

  },
  async allBooks({
    commit
  }) {
    commit('all')
  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  ALL(state) {
    axios.get('localhost:5000/books/all').then((response) => {
      state.books = response
    })
  },
  SHOW(state) {

  },
  EDIT() {

  },
  UPDATE() {

  },
  DELETE() {

  }

}
