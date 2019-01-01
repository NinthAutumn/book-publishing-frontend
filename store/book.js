export const state = () => ({
  books: []
})

export const getters = {
  isHighRated: (state) => {
    let goodBook = state.books.filter((book) => {
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
    await this.$axios.post('localhost:5000/books/add', {
      title: body.title,
      genres: body.genres,
      synopsis: body.synopsis,
      price: body.price,
      tags: body.tags,
      cover: body.cover,
      published: body.published,
      author: body.author
    }).then((response) => {
      commit('ALL', response)
    })

    // commit('add', book)
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
    await this.$axios.get('localhost:5000/books/all').then((response) => {
      commit('ALL', response)
    })
    // 
  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  ALL(state, books) {
    state.books = books
  },
  SHOW(state) {},
  EDIT() {

  },
  UPDATE() {

  },
  DELETE() {

  }

}
