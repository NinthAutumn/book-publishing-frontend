export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
  bookTitle: "",
  loading: false,
  toc: '',
  volumeList: [],
  modal: '',
  navigation: {},
  latestIndex: 0,
  latestBooks: [],
  dTOC: [], //chapters that aren't published
  pTOC: [] //chapters that are published shown in dashbaord of the user
})

export const getters = {
  published: (state) => {
    return state.pTOC
  },
  deleted: (state) => {
    return state.dTOC.filter((chapter) => {
      return chapter.state === 'deleted'
    })
  },
  draft: (state) => {
    return state.dTOC.filter((chapter) => {
      return chapter.state === 'draft'
    })
  },
  getNextChapter: (state) => {
    return state.navigation.next
  },
  getPrevChapter: (state) => {
    return state.navigation.prev
  },
  getVolumeList: (state) => {
    return state.volumeList
  },
  getNewIndex: (state) => {
    return state.latestIndex + 1
  },
  getChapterBookTitle: (state) => {
    return state.bookTitle
  },
  getLatestBooks: state => state.latestBooks
}

export const mutations = {
  SHOW(state, chapter) {
    state.chapter = chapter
    state.chapterCover = chapter.bookId.cover
  },
  SET_CHAPTER(state, chapter) {
    state.chapter = chapter
  },
  SET_NAVIGATION(state, {
    next,
    prev
  }) {
    state.navigation = {
      next,
      prev
    }
  },
  SET_BOOK_TITLE(state, bookTitle) {
    state.bookTitle = bookTitle
  },
  TOC(state, toc) {
    state.toc = toc
  },
  TOC_MODAL(state) {
    state.modal = 'table'
  },
  IMAGE(state) {
    state.modal = 'image'
  },
  SETTING(state) {
    state.modal = 'setting'
  },
  COMMENT(state) {
    state.modal = 'comment'
  },
  MODAL_CLOSE(state) {
    state.modal = ''
  },
  TOC_REVERSE(state) {
    state.pTOC = state.pTOC.reverse()
    state.pTOC.forEach((volume) => {
      volume.chapters.reverse()
    })
  },
  D_TOC(state, toc) {
    state.dTOC = toc
  },
  P_TOC(state, toc) {
    state.pTOC = toc
  },
  LOADING(state) {
    state.loading = true
  },
  LOADING_FALSE(state) {
    state.loading = false
  },
  SET_VOLUME_LIST(state, list) {
    state.volumeList = list
  },
  SET_LATEST_INDEX(state, index) {
    state.latestIndex = index
  },
  SET_LATEST_BOOKS(state, books) {
    state.latestBooks = books
  },
  LOAD_LATEST_BOOKS(state, books) {
    books.forEach((item) => {
      state.latestBooks.push(item)
    })

  }
}
export const actions = {
  async fetchChapter({
    commit,
    state
  }, {
    chapterId,
    userId,
    bookId
  }) {
    // const nextindex = index
    if (userId) {

      await this.$axios.get('/chapter/direct?chapterId=' + chapterId + '&user=' + userId).then((res) => {
        const {
          next,
          prev,
          chapter
        } = res.data
        commit('SET_CHAPTER', chapter)
        commit('SET_NAVIGATION', {
          next,
          prev
        })
      })
    } else {
      await this.$axios.get('/chapter/direct?chapterId=' + chapterId).then((res) => {
        const {
          next,
          prev,
          chapter
        } = res.data
        commit('SET_CHAPTER', chapter)
        commit('SET_NAVIGATION', {
          next,
          prev
        })
      })
    }
    if (!state.bookTitle) {
      await this.$axios.get(`/book/title?&bookId=${bookId}`).then((res) => {
        commit('SET_BOOK_TITLE', res.data.title.title)
      })
    }


  },
  async tableOfContent({
    commit,
    state
  }, bookId) {
    commit('LOADING')
    if (state.modal === 'table') {
      return commit('MODAL_CLOSE')
    }
    commit('TOC_MODAL')
    await this.$axios.get('chapter/toc?bookId=' + bookId).then((res) => {
      commit('TOC', res.data)

    })
    commit('LOADING_FALSE')

  },
  async fetchAllTOC({
    commit
  }, bookId) {
    await this.$axios.get('/chapter/dashboard?bookId=' + bookId).then((res) => {
      commit('D_TOC', res.data)
    })
  },
  async fetchPublishedTOC({
    commit
  }, bookId) {
    await this.$axios.get('/chapter/published?bookId=' + bookId).then((res) => {
      commit('P_TOC', res.data)
    })
  },
  async fetchVolumeList({
    commit
  }, bookId) {
    const res = await this.$axios.get('/chapter/volume/list?bookId=' + bookId)
    commit('SET_VOLUME_LIST', res.data)
  },
  async createChapter({
    commit
  }, {
    chapter,
    bookId
  }) {
    try {
      await this.$axios.post('/chapter/add?id=' + bookId, chapter)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchLatestIndex({
    commit
  }, {
    bookId,
    volume = ""
  }) {
    try {
      const res = await this.$axios.get(`/chapter/latestindex?bookId=${bookId}&volume=${volume}`)
      const {
        index
      } = res.data
      commit('SET_LATEST_INDEX', index)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchLatestBooks({
    commit
  }, {
    limit = 10,
    page = 1
  }) {
    try {
      const res = await this.$axios.get(`/chapter/latestbooks?limit=${limit}&page=${page}`)
      commit('SET_LATEST_BOOKS', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchMoreLatestBooks({
    commit
  }, {
    limit,
    page
  }) {
    try {
      const res = await this.$axios.get(`/chapter/latestbooks?limit=${limit}&page=${page}`)
      commit('LOAD_LATEST_BOOKS', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
