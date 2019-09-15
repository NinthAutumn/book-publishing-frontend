export const state = () => ({
  show: {},
  list: []
})

export const getters = {
  getUserReadingList: state => state.list,
  getReadingList: state => state.show
}

export const mutations = {
  SET_USER_READING_LIST(state, list) {
    state.list = list
  },
  SET_READING_LIST(state, list) {
    state.show = list
  }
}

export const actions = {
  async setReadingList({
    commit
  }, {
    readingList
  }) {
    try {
      await this.$axios.post('/v2/readinglist', readingList)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async addBookToReadingList({
    commit
  }, {
    id,
    book
  }) {
    try {
      await this.$axios.post(`/v2/readinglist/${id}`, book)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async likeReadingList({
    commit
  }, {
    id
  }) {
    try {
      await this.$axios.patch(`/v2/readinglist/${id}/like`)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchMyReadingList({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get('/v2/readinglist/show/me')
      commit('SET_USER_READING_LIST', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchReadingList({
    commit
  }, {
    id
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/${id}`)
      commit('SET_READING_LIST', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchUserReadingList({
    commit
  }, {
    user_id
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/show/user?user_id=${user_id}`)
      commit('SET_USER_READING_LIST', data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
