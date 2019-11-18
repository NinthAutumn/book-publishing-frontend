// import {
//   axios
import Vue from 'vue'

// } from 'axios'
import {
  get
} from 'lodash-es'
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
  }) {
    try {
      const res = await this.$axios.get(`/v2/book/${id}`)

      commit('SET_BOOK', get(res, 'data', {}))
    } catch (error) {
      console.log(error);
    }

    // await dispatch('fetchBookView', id)
    // await dispatch('fetchBookChapterCount', id)

  },
  async fetchBookChapterCount({
    commit
  }, id) {
    const res = await this.$axios.get(`/v2/chapter/${id}/count`).catch((error) => {
      return {
        error
      }
    })
    commit('SET_BOOK_CHAPTER_COUNT', get(res, 'data.count', 0))
  },
  async addBook({
    commit
  }, {
    book,
    tags,
    genres
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/v2/book', book)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async browseMobileBooks({
    commit
  }, {
    type,
    genre = "全部",
    page,
    tag = "全部",
    infinite = false,
    limit = 10,
    state = "ongoing"
  }) {

    const res = await this.$axios.patch('/v2/book/show/browse/mobile', {
      type,
      genre,
      page,
      tag,
      limit,
      state
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
    direction = 0,
    genres,
    page,
    tags = [],
    limit = 20,
    infinite = false,
    query = ""
  }) {
    try {
      const res = await this.$axios.get(`/v2/book/show/browse?genres=${genres}&tags=${tags}&direction=${direction}&page=${page}&limit=${limit}&type=${type}&query=${query}`)
      if (infinite) {
        commit('BROWSE_BOOKS_NEXT', res.data)
        return Promise.resolve(res.data)
      }
      commit('BROWSE_BOOKS', res.data)
    } catch (error) {
      console.log(error);
    }


    // const res = await this.$axios.get()

  },
  async editBook({
    commit
  }) {

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
      const res = await this.$axios.get(`/v2/tag/query?search=${search}&limit=${limit}&page=${page}`)

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
      const res = await this.$axios.get(`/v2/tag/query?search=${search}&limit=${limit}&page=${page}`)
      commit('SET_TAG_LIST', res.data)
      return Promise.resolve(res.data)
    } catch (error) {

    }

  },
  async deleteBook({
    commit
  }) {},
  async fetchLatestBooks({
    commit
  }, {
    page,
    limit,
    infinite = false,
    structured
  }) {
    try {
      const res = await this.$axios.get(`/v2/book/show/latest?limit=${limit}&page=${page}${structured? '&structured=true':''}`)
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
      const res = await this.$axios.get(`/v2/book/show/latest?limit=${limit}&page=${page}`)
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
    infinite = false,
    limit = 5
  }) {
    try {
      const res = await this.$axios.get(`/v2/announcement/book/${bookId}?page=${page}&limit=${limit}`)
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
      const res = await this.$axios.post(`/v2/announcement/book`, {
        title,
        content,
        book_id: bookId
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
      const {
        data
      } = await this.$axios.post(`/v2/book/${bookId}/vote`)
      if (data.error) {
        return Promise.resolve({
          error: data.error
        })
      }
      return Promise.resolve()
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  },
  async fetchBookGenreAndTags({
    commit
  }, bookId) {
    try {
      const res = await this.$axios.get(`/v2/book/${bookId}/category`)
      commit('SET_BOOK_GENRES', res.data.genres)
      commit('SET_BOOK_TAGS', res.data.tags)
    } catch (error) {

    }
  },
  async fetchAllGenres({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/genre`)
      // console.log(res.data);
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
      const res = await this.$axios.patch(`/v2/book/${book.id}`, book)
    } catch (error) {
      console.log(error);
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
    state.genres = []
    genres.forEach((genre) => {
      state.genres.push({
        ...genre,
        selected: false
      })
    })

  },
  REMOVE_GENRES(state) {
    state.genres = []
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
    state.browse.push(...books)
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
  },
  SET_LATEST_BOOKS(state, books) {
    state.latest = books
  },
  CHANGE_AUTHOR_STATE: function (state) {
    state.createAuthor = !state.createAuthor
  },
  SET_MORE_LATEST_BOOKS(state, books) {
    state.latest.push(...books)

  },
  SET_ANNOUNCEMENTS: (state, announcements) => {
    state.announcements = announcements
  },
  PUSH_ANNOUNCEMENTS: (state, announcements) => {
    state.announcements.push(...announcements)
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
    state.books[type].push(...books)
  },
  SELECT_GENRE: (state, {
    index,
    genre
  }) => {
    Vue.set(state.genres, index, genre);

  }
}
