import _ from 'lodash'

export const state = () => ({
  bookmarks: [],
  favorites: [],
  reading: [],
  read_later: [],
  history: []
})

export const getters = {

}

export const mutations = {
  GET_BOOKMARK(state, bookmarked) {
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
  SORT_BY_DATE(state) {
    state.bookmarks = _.orderBy(state.bookmarks, function (item) {
      return item.insertedDate
    }, 'desc')

  },
  SORT_BY_NAME(state) {
    // state.bookmarks.sort((d1, d2) => new Date(d2.insertedDate).getTime() - new Date(d1.insertedDate).getTime());
    state.bookmarks = _.orderBy(state.bookmarks, function (item) {
      return item.bookId.title
    }, 'desc')
  }
}

export const actions = {
  async checkBookmark({
    commit
  }, bookId) {
    try {
      const status = await this.$axios.get(process.env.baseUrl + '/library/check?bookId=' + bookId)
      commit('BOOKMARK_STATUS', status.data.bookmarked)
    } catch (error) {
      throw error
    }

  },
  async getBookmark({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/library/bookmarks').then((res) => {
      commit('GET_BOOKMARK', res.data.store)
    })
  },
  async getFavorites({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/library/show?type=favorite').then((res) => {
      commit('GET_FAVORITE', res.data)
    })
  },
  async getReading({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/library/show?type=reading').then((res) => {
      commit('GET_READING', res.data)
    })
  },
  async getHistory({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/library/history').then((res) => {
      commit('GET_HISTORY', res.data)
    })
  },
  async getRead_Later({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/library/show?type=readLater').then((res) => {
      commit('GET_READ_LATER', res.data)
    })
  },
  async addStore({
    commit
  }, store) {
    await this.$axios.patch(process.env.baseUrl + '/library/updateLibrary', {
      store
    })
  },
  async removeStore({
    commit
  }, store) {
    await this.$axios.patch(process.env.baseUrl + '/library/updateDeleteLibrary', {
      store
    })
  }
}
