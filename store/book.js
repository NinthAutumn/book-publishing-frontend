// import {
//   axios
// } from 'axios'

export const state = () => ({
  books: [],
  book: {}
})

export const getters = {
  isHighRated: (state) => {
    // let goodBook = state.books.filter((book) => {
    //   book.rating > 4
    // });
    // return goodBook
  },
  isTrending: (state) => {

  }
}

export const actions = {
  async getBook({
    commit
  }, id) {
    await this.$axios.get(process.env.baseUrl + '/books/show?id=' + id).then((res) => {
      // console.log()
      commit('SHOW', res.data.book)
    })
  },
  async addBook({
    commit
  }, book) {
    await this.$axios.post(process.env.baseUrl + '/books/add', {
      title: book.title,
      genres: book.genres,
      synopsis: book.synopsis,
      price: book.price,
      tags: book.tags,
      cover: book.cover,
      published: book.published,
      author: book.userId
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
    const book = await this.$axios.get(process.env.baseUrl + '/books/all')

    commit('ALL', book.data.books)
    // console.log(state.books)
  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  ALL(state, books) {
    state.books = books
  },
  SHOW(state, book) {
    state.book = book
  },
  EDIT() {

  },
  UPDATE() {

  },
  DELETE() {

  }

}
