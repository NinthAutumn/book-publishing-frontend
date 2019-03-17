import _ from 'lodash'
import Cookies from 'js-cookie';

export const state = () => ({
  bookmarks: [],
  favorites: [],
  reading: [],
  read_later: [],
  history: [],
  latestChapters: []
})

export const getters = {
  getLatestChapters: (state) => {
    return state.latestChapters
  }
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
    state.bookmarks = _.orderBy(state.bookmarks, function (item) {
      return item.bookId.title
    }, 'desc')
  },
  SET_LATEST_CHAPTERS(state, {
    chapters
  }) {
    state.latestChapters = chapters
  }
}

export const actions = {
  async checkBookmark({
    commit
  }, bookId) {
    try {
      const status = await this.$axios.get('/library/check?bookId=' + bookId)
      commit('BOOKMARK_STATUS', status.data.bookmarked)
    } catch (error) {
      throw error
    }

  },
  async getBookmark({
    commit
  }) {
    await this.$axios.get('/library/bookmarks').then((res) => {
      if (res) {
        commit('GET_BOOKMARK', res.data.store)
      }

    })
  },
  async getFavorites({
    commit
  }) {
    await this.$axios.get('/library/show?type=favorite').then((res) => {
      if (res) {
        commit('GET_FAVORITE', res.data)
      }

    })
  },
  async getReading({
    commit
  }) {
    await this.$axios.get('/library/show?type=reading').then((res) => {
      if (res) {
        commit('GET_READING', res.data)
      }

    })
  },
  async getHistory({
    commit
  }) {
    await this.$axios.get('/library/history').then((res) => {
      if (res) {
        commit('GET_HISTORY', res.data)
      }

    })
  },
  async getRead_Later({
    commit
  }) {
    await this.$axios.get('/library/show?type=readLater').then((res) => {
      commit('GET_READ_LATER', res.data)
    })
  },
  async addStore({
    commit
  }, store) {
    await this.$axios.patch('/library/updateLibrary', {
      store
    })
  },
  async removeStore({
    commit
  }, store) {
    await this.$axios.patch('/library/updateDeleteLibrary', {
      store
    })
  },
  async fetchLatestChapters({
    commit
  }) {
    try {
      const res = await this.$axios.get('/library/show/chapters')
      if (res) {
        const {
          chapters
        } = res.data

        commit('SET_LATEST_CHAPTERS', {
          chapters
        })
      }

    } catch (error) {
      console.log(error.status);
      throw error
    }

  },
  async patchLatestChapters({
    dispatch
  }, {
    chapterId
  }) {
    try {
      const res = await this.$axios.patch('/library/update/chapters?chapterId=' + chapterId)
      dispatch('fetchLatestChapters')
    } catch (error) {
      console.log(error);
      throw error
    }

  }
}
