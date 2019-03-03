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
    highestrated: [],
    trending: []
  },
  view: "",
  bookSynopsis: true,
  book: {},
  loading: false,
  browse: []
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
      commit('SHOW', res.data.book)
    })
    await this.$axios.get(process.env.baseUrl + "/books/bookview?id=" + id).then((res) => {
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

    await this.$axios.post(process.env.baseUrl + '/books/add', book)
    // console.log("why?????");
  },
  async browseBooks({
    commit
  }, {
    type,
    direction,
    genres,
    page
  }) {
    if (direction === '上り') {
      direction = 'asc'
    } else {
      direction = 'desc'
    }
    const books = await this.$axios.patch(process.env.baseUrl + '/books/browse?direction=' + direction + '&type=' + type + '&page=' + page, {
      genres
    })
    commit('BROWSE_BOOKS', books.data)
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
    commit,
  }) {
    await this.$axios.get(process.env.baseUrl + '/homepage/highestrated').then((res) => {
      commit('HIGHEST_RATED', res.data)
    })
    await this.$axios.get(process.env.baseUrl + '/homepage/trending').then((res) => {
      commit('TRENDING', res.data)
    })

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
    state.books.highestrated = books
  },
  TRENDING(state, books) {
    books.forEach(async (book) => {
      if (book._id.book[0].ratings) {
        book._id.book[0].ratings = +book._id.book[0].ratings.toFixed(2)
      }
    })
    state.books.trending = books
  },
  SHOW(state, book) {
    state.book = book
  },
  EDIT() {

  },
  BROWSE_BOOKS(state, books) {
    state.browse = books
  },
  UPDATE() {

  },
  URL_GOOGLE() {
    const url = "https://storage.googleapis.com/theta-images/"
  },
  DELETE() {

  },
  BOOK_VIEW(state, view) {
    state.view = view
  },
  ASC_CHAP(state) {},
  FORMAT_DATE(state) {
    state.book.chapters.forEach((chapter) => {

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
