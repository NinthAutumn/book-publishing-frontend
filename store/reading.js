export const state = () => ({
  show: {},
  list: [],
  listWithoutBooks: [],
  modal: false,
  selected_book: "",
  selected_list: "",
  latest: [],
  listByBook: [],
  listInfo: {},
  listModal: false,
  books: []
})

export const getters = {
  getUserReadingList: state => state.list,
  getReadingList: state => state.show,
  getUserReadingListWithoutBook: state => state.listWithoutBooks,
  getModalState: state => state.modal,
  getSelectedBook: state => state.selected_book,
  getLatestList: state => state.latest,
  getListByBook: state => state.listByBook,
  getListInfo: state => state.listInfo,
  getSelectedList: state => state.selected_list,
  getListModalState: state => state.listModal,
  getListBooks: state => state.books
}

export const mutations = {
  SET_USER_READING_LIST: (state, list) => state.list = list,
  SET_READING_LIST: (state, list) => state.show = list,
  SET_USER_READING_LIST_WITHOUT_BOOK: (state, list) => state.listWithoutBooks = list,
  TOGGLE_STATE(state, id) {
    state.modal = !state.modal
    state.selected_book = id
  },
  SET_LATEST: (state, list) => state.latest = list,
  SET_LIST_BY_BOOK: (state, list) => state.listByBook = list,
  SET_READING_LIST_INFO: (state, list) => state.listInfo = list,
  TOGGLE_LIST_MODAL(state, id) {
    state.listModal = !state.listModal
    state.selected_list = id
  },
  SET_READING_LIST_BOOKS: (state, list) => state.books = list
}

export const actions = {
  async setReadingList({
    commit
  }, {
    title,
    description
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/v2/readinglist', {
        title,
        description
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.resolve({
        error
      })
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
  async fetchReadingListInfo({
    commit
  }, {
    id
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/show/${id}/info`)
      commit('SET_READING_LIST_INFO', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchListByBookId({
    commit
  }, {
    book_id,
    page = 1,
    limit = 10
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/show/book?book_id=${book_id}&page=${page}&limit=${limit}`)
      commit('SET_LIST_BY_BOOK', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchReadingListBookList({
    commit
  }, {
    page = 1,
    limit = 10,
    id
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/show/${id}/book?page=${page}&limit=${limit}`)
      commit('SET_READING_LIST_BOOKS', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchLatestReadingList({
    commit
  }, {
    page = 1,
    limit = 10
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/show/latest?page=${page}&limit=${limit}`)
      commit('SET_LATEST', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async followReadingList({
    commit
  }, {
    id
  }) {
    try {
      await this.$axios.patch(`/v2/readinglist/${id}/follow`)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchMyReadingListWithoutBooks({
    commit
  }, {
    id
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/readinglist/show/me/${id}/list`)
      commit('SET_USER_READING_LIST_WITHOUT_BOOK', data)
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
