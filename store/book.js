// import {
//   axios
// } from 'axios'
import {
  get
} from 'lodash'
export const state = () => ({
  // books: [],
  recommended: [],
  books: {
    popular: [],
    chapter: [],
    rating: [],
    view: [],
    word: []
  },
  view: "",
  bookSynopsis: true,
  book: {},
  loading: false,
  browse: [],
  tags: [],
  bookGenres: [],
  chapterCount: 0,
  latest: [],
  createAuthor: false,
  announcements: [],
  genres: [],


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
  getRecommended: state => state.recommended,
  getLatest: state => state.latest,
  getAnnouncements: state => state.announcements,
  getBrowseBooks: state => state.browse,
  getBookTags: state => state.tags,
  getBookGenres: state => state.bookGenres,
  getGenres: state => state.genres,
  getMobileBrowse: (state) => (type) => {
    return state.books[type]
  }
}

export const actions = {
  async fetchBook({
    commit,
    dispatch
  }, {
    id,
    userId = ""
  }) {
    try {
      const res = await this.$axios.get(`book/show?id=${id}&userId=${userId}`)
      commit('SET_BOOK', get(res, 'data.book', {}))
    } catch (error) {

    }

    // await dispatch('fetchBookView', id)
    // await dispatch('fetchBookChapterCount', id)

  },
  async fetchBookView({
    commit
  }, id) {
    // await this.$axios.get("/book/view?id=" + id).then((res) => {
    //   commit('SET_BOOK_VIEW', res.data)
    // })
  },
  async fetchBookChapterCount({
    commit
  }, id) {
    const res = await this.$axios.get("/book/count?bookId=" + id).catch((error) => {
      return {
        error
      }
    })
    commit('SET_BOOK_CHAPTER_COUNT', get(res, 'data.count', 0))
  },
  async addBook({
    commit
  }, book) {
    try {
      const {
        data
      } = await this.$axios.post('/book/add', book)
      // if (res.data.noAuthor) {
      //   return commit('CHANGE_AUTHOR_STATE')
      // }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async browseMobileBooks({
    commit
  }, {
    type,
    genre,
    page,
    tag,
    infinite = false
  }) {

    const res = await this.$axios.patch('/book/mobile/browse', {
      type,
      genre,
      page,
      tag,
    })

    if (infinite) {
      commit('SET_MOBILE_BROWSE_NEXT', {
        books: res.data,
        type
      })
      return Promise.resolve(res.data)
    }
    commit('SET_MOBILE_BROWSE', {
      books: res.data,
      type
    })
    return Promise.resolve(res.data)
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
    tfilter = true,
    limit = 20,
    infinite = false
  }) {

    const res = await this.$axios.patch('/book/browse', {
      genres,
      gfilter,
      tfilter,
      tags,
      direction,
      type,
      page,
      limit
    })
    if (infinite) {
      commit('BROWSE_BOOKS_NEXT', res.data)
      return Promise.resolve(res.data)
    }
    commit('BROWSE_BOOKS', res.data)
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
    const taglist = await this.$axios.get('/tag/list?limit=' + limit + '&page=' + page)
    commit('SET_TAG_LIST', taglist.data)
  },
  async searchTags({
    commit
  }, {
    search,
    page,
    limit,
    infinite = false
  }) {
    try {
      const res = await this.$axios.get(`/tag/list?search=${search}&limit=${limit}&page=${page}`)
      if (infinite) {
        commit('PUSH_TAG_LIST', res.data)

      } else {
        commit('SET_TAG_LIST', res.data)

      }
      return Promise.resolve({
        tags: res.data
      })
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async queryTags({
    commit
  }, {
    search,
    page,
    limit
  }) {
    try {
      const res = await this.$axios.get(`/tag/query?search=${search}&limit=${limit}&page=${page}`)
      commit('SET_TAG_LIST', res.data)
      return Promise.resolve(res.data)
    } catch (error) {

    }

  },
  async deleteBook({
    commit
  }) {},
  async fetchRecommended({
    commit,
  }) {
    await this.$axios.get('/analytic/book/recommended').then((res) => {
      commit('SET_RECOMMENDED', res.data)
    })
    // await this.$axios.get('/analytic/book/trending').then((res) => {
    //   commit('TRENDING', res.data)
    // })
  },
  async fetchLatestBooks({
    commit
  }, {
    page,
    limit,
    infinite = false
  }) {
    try {
      const res = await this.$axios.get(`/book/update?limit=${limit}&page=${page}`)
      if (infinite) {
        commit('SET_MORE_LATEST_BOOKS', res.data)
      } else {
        commit('SET_LATEST_BOOKS', res.data)
      }

      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchMoreLatestBooks({
    commit
  }, {
    page,
    limit
  }) {
    try {
      const res = await this.$axios.get(`/book/update?limit=${limit}&page=${page}`)
      commit('SET_MORE_LATEST_BOOKS', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchAnnouncements({
    commit
  }, {
    bookId,
    page = 1,
    infinite = false
  }) {
    try {
      const res = await this.$axios.get(`/book/announcements?bookId=${bookId}&page=${page}`)
      if (infinite) {
        commit('PUSH_ANNOUNCEMENTS', res.data)
        return Promise.resolve({
          announcement: res.data
        })
      }
      commit('SET_ANNOUNCEMENTS', res.data)
    } catch (error) {

    }
  },
  async postAnnouncement({
    commit
  }, {
    title,
    content,
    bookId
  }) {
    try {
      const res = await this.$axios.post(`/book/announcement`, {
        title,
        content,
        bookId
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postVote({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.post(`/book/vote?bookId=${bookId}`)
      if (res.data.error) {
        return Promise.resolve({
          error: res.data.error
        })
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchBookGenreAndTags({
    commit
  }, bookId) {
    try {
      const res = await this.$axios.get(`/book/category?bookId=${bookId}`)
      commit('SET_BOOK_GENRES', res.data.genres)
      commit('SET_BOOK_TAGS', res.data.tags)
    } catch (error) {

    }
  },
  async fetchAllGenres({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/book/genres`)
      commit('SET_GENRES', res.data)
    } catch (error) {

    }
  },
  async updateBook({
    commit
  }, {
    book
  }) {
    try {
      const res = await this.$axios.patch('/book/', {
        book
      })
    } catch (error) {

    }
  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  SET_BOOK_TAGS(state, tags) {
    state.tags = tags
  },
  SET_BOOK_GENRES(state, genres) {
    state.bookGenres = genres
  },
  SET_GENRES(state, genres) {
    state.genres = genres
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
  BROWSE_BOOKS_NEXT(state, books) {
    books.forEach((book) => {
      state.browse.push(book)
    })

  },
  SET_TAG_LIST(state, tags) {
    state.tagList = tags
  },
  PUSH_TAG_LIST(state, tags) {
    tags.forEach((tag) => {
      state.tagList.push(tag)
    })
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
  },
  SET_LATEST_BOOKS(state, books) {
    state.latest = books
  },
  CHANGE_AUTHOR_STATE: function (state) {
    state.createAuthor = !state.createAuthor
  },
  SET_MORE_LATEST_BOOKS(state, books) {
    let temp = books
    // state.latest.forEach((item) => {
    //   temp.forEach((book, index) => {
    //     if (item.date === book.date) {
    //       book.book.forEach((boo) => {
    //         item.book.push(boo)
    //       })
    //       temp.splice(index, 1)
    //     }
    //   })
    // })
    // (books);
    temp.forEach((book) => {
      state.latest.push(book)
    })
  },
  SET_ANNOUNCEMENTS: (state, announcements) => {
    state.announcements = announcements
  },
  PUSH_ANNOUNCEMENTS: (state, announcements) => {
    announcements.forEach((announcement) => {
      state.announcements.push(announcement)
    })
  },
  SET_MOBILE_BROWSE: function (state, {
    books,
    type
  }) {
    state.books[type] = books
  },
  SET_MOBILE_BROWSE_NEXT: function (state, {
    books,
    type
  }) {
    books.forEach((book) => {
      state.books[type].push(book)
    })
  }
}
