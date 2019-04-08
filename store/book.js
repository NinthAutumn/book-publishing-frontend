import {
  strict
} from 'assert';

// import {
//   axios
// } from 'axios'

const moment = require('moment');

export const state = () => ({
  // books: [],
  recommended: [],
  books: {
    trending: []
  },
  view: "",
  bookSynopsis: true,
  book: {},
  loading: false,
  browse: [],
  tagList: [],
  chapterCount: 0,
})

export const getters = {
  highestrated: state => state.books.highestrated,
  isTrending: (state) => {

  },
  chapAsc: (state) => {

  },
  getBook: state => state.book,
  getBookView: state => state.view,
  getBookChapterCount: state => state.chapterCount,
  getTagList: state => state.tagList,
  getRecommended: state => state.recommended
}

export const actions = {
  async fetchBook({
    commit,
    dispatch
  }, id) {
    await this.$axios.get('book/show?id=' + id).then((res) => {
      commit('SET_BOOK', res.data.book)
    })
    await dispatch('fetchBookView', id)
    await dispatch('fetchBookChapterCount', id)

  },
  async fetchBookView({
    commit
  }, id) {
    await this.$axios.get("/book/view?id=" + id).then((res) => {
      commit('SET_BOOK_VIEW', res.data)
    })
  },
  async fetchBookChapterCount({
    commit
  }, id) {
    await this.$axios.get("/book/chapterCount?bookId=" + id).then((res) => {
      commit('SET_BOOK_CHAPTER_COUNT', res.data.count)
    })
  },
  async addBook({
    commit
  }, book) {
    try {
      await this.$axios.post('/book/add', book)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

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
  async fetchTagList({
    commit
  }, {
    page = 1,
    limit = 10
  }) {
    const taglist = await this.$axios.get('/book/tags?limit=' + limit + '&page=' + page)
    commit('SET_TAG_LIST', taglist.data)
  },
  async searchTags({
    commit
  }, {
    search,
    page,
    limit
  }) {
    const res = await this.$axios.get(`/book/searchtag?search=${search}&limit=${limit}&page=${page}`)
    commit('SET_TAG_LIST', res.data)
  },
  async deleteBook({
    commit
  }) {

  },
  async fetchRecommended({
    commit,
  }) {
    await this.$axios.get('/analytic/book/recommended').then((res) => {
      commit('SET_RECOMMENDED', res.data)
    })
    // await this.$axios.get('/analytic/book/trending').then((res) => {
    //   commit('TRENDING', res.data)
    // })

  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  SET_RECOMMENDED(state, books) {
    state.recommended = books
  },
  TRENDING(state, books) {
    state.books.trending = books
  },
  SET_BOOK(state, book) {
    state.book = book
  },
  BROWSE_BOOKS(state, books) {
    state.browse = books
  },
  SET_TAG_LIST(state, tags) {
    state.tagList = tags
  },
  SET_BOOK_VIEW(state, view) {
    state.view = view
  },
  SET_BOOK_CHAPTER_COUNT(state, chapterCount) {
    state.chapterCount = chapterCount
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
