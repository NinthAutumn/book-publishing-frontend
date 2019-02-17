export const state = () => ({
  bookmarks: [],
  favorites: [],
  reading: [],
  read_later: []
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
  }
}

export const actions = {
  async getBookmark({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/library/bookmarks').then((res) => {

      commit('GET_BOOKMARK', res.data)
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

  }
}
