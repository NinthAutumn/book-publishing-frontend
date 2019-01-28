import {
  strict
} from 'assert';

// import {
//   axios
// } from 'axios'

const moment = require('moment');

export const state = () => ({
  // books: [],
  books: {
    highestrated: {}
  },
  view: "",
  bookSynopsis: true,
  book: {}
})

export const getters = {
  highestrated: state => state.books.highestrated,
  isTrending: (state) => {

  },
  chapAsc: (state) => {

  },
  showbook: state => state.book
}

export const actions = {
  async getBook({
    commit
  }, id) {
    await this.$axios.get(process.env.baseUrl + '/books/show?id=' + id).then((res) => {
      // console.log()
      commit('SHOW', res.data.book)
    })
    await this.$axios.get(process.env.baseUrl + "/books/bookview?id=" + id).then((res) => {
      // console.log(res.data);
      commit('BOOK_VIEW', res.data)
    })
  },
  async addCover({
    commit
  }, data) {


    await this.$axios.post(process.env.baseUrl + '/books/addCover', {

    }, config).then((res) => {

    })
  },
  async addBook({
    commit
  }, book) {

    let config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };
    config.headers['X-HTTP-Method-Override'] = 'PUT';

    await this.$axios.post(process.env.baseUrl + '/books/add', book, config).then((response) => {
      commit('ALL', response)
      console.log("object");
    })
    // commit('add', book)
  },
  async uploadCover({
    commit
  }, formData) {

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
    const book = await this.$axios.get(process.env.baseUrl + '/homepage/highestrated')
    // console.log(book.data);
    commit('HIGHEST_RATED', book.data)


    // console.log(state.books)
  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  HIGHEST_RATED(state, books) {
    books.forEach(async (book) => {
      book.ratings = +book.ratings.toFixed(2)
    })
    // books.ratings = Math.round(books.ratings)
    state.books.highestrated = books
  },
  SHOW(state, book) {
    state.book = book
  },
  EDIT() {

  },
  UPDATE() {

  },
  DELETE() {

  },
  BOOK_VIEW(state, view) {
    state.view = view
  },
  ASC_CHAP(state) {
    // console.log(state.book);
    state.book.chapters = state.book.chapters.reverse()
  },
  FORMAT_DATE(state) {
    state.book.chapters.forEach((chapter) => {

      // let createdAt = new Date(chapter.createdAt);
      // console.log(createdAt - Date.now())
      // const day = createdAt.toLocaleDateString("en-US");
      // console.log(moment(createdAt, 'YYYY-MM-DDYYYY-MM-DDTHH:mm:ss.SSSZ').isValid());
      // const kiss = 

      // console.log(kiss);
      // chapter.createdAt = moment(createdAt, 'YYYY-MM-DDYYYY-MM-DDTHH:mm:ss.SSSZ').isValid();

      // console.log(chapter.createdAt);
    })

  },
  SYNOPSIS_TRUE(state) {
    state.bookSynopsis = true
  },
  SYNOPSIS_FALSE(state) {

    state.bookSynopsis = false

  },
  BOOKMARKED(state, bookmark) {
    if (bookmark.store) {
      bookmark.store.forEach((store) => {
        if (store.bookId === state.book._id) {
          state.book.bookmarked = true
        }
      })
    }

  },
  BOOKMARK(state) {
    state.book.bookmarked = true
  }

}
