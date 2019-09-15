export const state = () => ({
  bookmarks: [],
  bookmarked: false,
  favorites: [],
  reading: [],
  read_later: [],
  history: [],
  latestChapters: [],
  reviews: [],
  profile: {}
})

export const getters = {
  getLatestChapters: (state) => {
    return state.latestChapters
  },
  isBookmarked: (state) => {
    return state.bookmarked
  },
  getReviews: state => state.reviews,
  getBookmarks: state => state.bookmarks,
  getHistory: state => state.history,
  getProfile: state => state.profile
}


export const mutations = {
  SET_BOOKMARK(state, bookmarked) {
    state.bookmarks = bookmarked
  },
  GET_FAVORITE(state, favorites) {
    state.favorites = favorites
  },
  GET_READING(state, readings) {
    state.reading = readings
  },
  GET_READ_LATER(state, read_later) {
    state.read_later = read_later
  },
  PUSH_BOOKMARK(state, bookmark) {
    state.bookmarks.push(bookmark)
  },
  BOOKMARK_STATUS(state, bookmarked) {
    state.bookmarked = bookmarked
  },
  GET_HISTORY(state, history) {
    state.history = history
  },
  SET_LATEST_CHAPTERS(state, {
    chapters
  }) {
    state.latestChapters = chapters
  },
  SET_REVIEWS: (state, reviews) => {
    state.reviews = reviews
  },
  SET_PROFILE: (state, profile) => {
    state.profile = profile
  }
}

export const actions = {
  async getBookmark({
    commit
  }, {
    sortby = 0
  }) {
    try {
      const res = await this.$axios.get(`/v2/library/show/list?type=bookmark&sortBy=${sortby}`)
      commit('SET_BOOKMARK', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      Promise.reject(error)
    }

  },
  async fetchUserProfile({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get('/v2/library/show/profile')
      commit('SET_PROFILE', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getHistory({
    commit
  }) {
    await this.$axios.get('/v2/library/show/history').then((res) => {
      if (res) {
        commit('GET_HISTORY', res.data)
      }

    })
  },
  async patchStore({
    commit
  }, {
    store
  }) {
    await this.$axios.patch('/v2/library', {
      type: store.type,
      book_id: store.bookId
    })
  },
  async fetchReviews({
    commit
  }) {
    try {
      const res = await this.$axios.get('/v2/review/show/me')
      commit('SET_REVIEWS', res.data)
    } catch (error) {
      Promise.reject(error)
    }
  },
  async postHistory({
    commit
  }, {
    chapterId,
    bookId
  }) {
    try {
      const res = await this.$axios.patch(`/v2/library/history`, {
        chapter_id: chapterId,
        book_id: bookId
      })
    } catch (error) {

    }
  }
}
