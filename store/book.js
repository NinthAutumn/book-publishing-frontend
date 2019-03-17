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
  browse: [],
  tagList: []
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
    await this.$axios.get('book/show?id=' + id).then((res) => {
      commit('SHOW', res.data.book)
    })
    await this.$axios.get("/book/bookview?id=" + id).then((res) => {
      commit('BOOK_VIEW', res.data)
    })
  },
  async addBook({
    commit
  }, book) {

    await this.$axios.post('/book/add', book)
  },
  async browseBooks({
    commit
  }, {
    type,
    direction = 'desc',
    genres,
    page,
    gfilter = true,
    tags = [],
    tfilter = true
  }) {

    const books = await this.$axios.patch('/book/browse?direction=' + direction + '&type=' + type + '&page=' + page, {
      genres,
      gfilter,
      tfilter,
      tags
    })
    commit('BROWSE_BOOKS', books.data)
  },
  async editBook({
    commit
  }) {

  },
  async tagList({
    commit
  }, {
    page = 1,
    limit = 10
  }) {
    const taglist = await this.$axios.get('/book/tags?limit=' + limit + '&page=' + page)
    commit('TAG_LIST', taglist.data)
  },
  async deleteBook({
    commit
  }) {

  },
  async allBooks({
    commit,
  }) {
    await this.$axios.get('/data/homepage/highestrated').then((res) => {
      commit('HIGHEST_RATED', res.data)
    })
    await this.$axios.get('/data/homepage/trending').then((res) => {
      commit('TRENDING', res.data)
    })

  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  HIGHEST_RATED(state, books) {
    state.books.highestrated = books
  },
  TRENDING(state, books) {
    state.books.trending = books
  },
  SHOW(state, book) {
    state.book = book
  },
  EDIT() {},
  BROWSE_BOOKS(state, books) {
    state.browse = books
  },
  TAG_LIST(state, tags) {
    state.tagList = tags
  },
  URL_GOOGLE() {
    const url = "https://storage.googleapis.com/theta-images/"
  },
  DELETE() {

  },
  BOOK_VIEW(state, view) {
    state.view = view
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
