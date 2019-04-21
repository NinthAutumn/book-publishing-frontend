export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
  bookTitle: "",
  loading: false,
  list: [],
  volumeList: [],
  modal: '',
  navigation: {},
  latestIndex: 0,
  latestBooks: [],
  latestBooksSimple: [],
  dTOC: [], //chapters that aren't published
  count: 0
})

export const getters = {
  getChapterList: (state) => {
    return state.list
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
  getChapterCount: state => state.count,
  getLatestBooks: state => state.latestBooks,
  getLatestBooksSimple: state => state.latestBooksSimple,
  getChapter: state => state.chapter,
}

export const mutations = {
  SHOW(state, chapter) {
    state.chapter = chapter
    state.chapterCover = chapter.bookId.cover
  },
  SET_CHAPTER(state, chapter) {
    state.chapter = chapter
  },
  SET_CHAPTER_LIST: (state, list) => {
    state.list = list
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
  SET_CHAPTER_COUNT(state, count) {
    state.count = count
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
  },
  LOAD_LATEST_BOOKS_SIMPLE(state, books) {
    state.latestBooksSimple = books
  }
}
export const actions = {
  async fetchChapter({
    commit,
    state
  }, {
    chapterId,
    userId = "",
    bookId
  }) {
    // const nextindex = index
    await this.$axios.get('/book/chapter?chapterId=' + chapterId + '&user=' + userId).then((res) => {
      const {
        next,
        prev,
        chapter
      } = res.data
      commit('SET_CHAPTER', chapter)
      // commit('SET_NAVIGATION', {
      //   next,
      //   prev
      // })
    })

    if (!state.bookTitle) {
      const res = await this.$axios.get(`/book/title?bookId=${bookId}`)
      commit('SET_BOOK_TITLE', res.data.title)

    }
    if (!state.count) {
      const res = await this.$axios.get(`book/chapter/count?bookId=${bookId}`)
      commit('SET_CHAPTER_COUNT', res.data.count)
    }
  },
  async fetchChapterNav({
    commit
  }, {
    bookId,
    index
  }) {
    try {
      const res = await this.$axios.get('/book/chapter/nav?index=' + index + '&bookId=' + bookId)
      const {
        next,
        prev,
      } = res.data
      commit('SET_NAVIGATION', {
        next,
        prev
      })
    } catch (error) {

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
    await this.$axios.get('/book/chapter/published/list?bookId=' + bookId).then((res) => {
      commit('SET_CHAPTER_LIST', res.data)
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
  async fetchPublishedList({
    commit
  }, {
    bookId
  }) {
    await this.$axios.get('/book/chapter/published/list?bookId=' + bookId).then((res) => {
      commit('SET_CHAPTER_LIST', res.data)
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
  },
  async fetchMoreLatestBooksSimple({
    commit
  }, {
    limit,
    page
  }) {
    try {
      const res = await this.$axios.get(`/chapter/latestbooks/simple?limit=${limit}&page=${page}`)
      commit('LOAD_LATEST_BOOKS_SIMPLE', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
