export const state = () => {
  books: {}
}


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
  addBook({
    commit
  }, book) {
    commit('add', book)
  },
  editBook({
    commit
  }) {

  },
  deleteBook({
    commit
  }) {

  },
  allBooks({
    commit
  }) {
    commit('all')
  }
}

export const mutations = {
  add(state, book) {
    state.books.push(book)
  },
  all(state) {
    axios.get('localhost:5000/books/all').then((response) => {
      state.books = response
    })
  },
  show(state) {

  },
  edit() {

  },
  update() {

  },
  delete() {

  }

}
