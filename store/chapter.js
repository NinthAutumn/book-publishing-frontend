export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
  loading: false,
  toc: '',
  volumeList: [],
  modal: '',
  navigation: {},
  latestIndex: 0,
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
  }
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
  }
}
export const actions = {
  async fetchChapter({
    commit
  }, {
    chapterId,
    userId
  }) {
    // const nextindex = index
    if (userId) {
      await this.$axios.get(process.env.baseUrl + '/chapters/direct?chapterId=' + chapterId + '&user=' + userId).then((res) => {
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
      await this.$axios.get(process.env.baseUrl + '/chapters/direct?chapterId=' + chapterId).then((res) => {
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
    await this.$axios.get(process.env.baseUrl + '/chapters/toc?bookId=' + bookId).then((res) => {
      commit('TOC', res.data)

    })
    commit('LOADING_FALSE')

  },
  async fetchAllTOC({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/dashboard?bookId=' + bookId).then((res) => {
      commit('D_TOC', res.data)
    })
  },
  async fetchPublishedTOC({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/published?bookId=' + bookId).then((res) => {
      commit('P_TOC', res.data)
    })
  },
  async fetchVolumeList({
    commit
  }, bookId) {
    const res = await this.$axios.get(process.env.baseUrl + '/chapters/volume/list?bookId=' + bookId)
    commit('SET_VOLUME_LIST', res.data)
  },
  async createChapter({
    commit
  }, {
    chapter,
    bookId
  }) {
    await this.$axios.post(process.env.baseUrl + '/chapters/add?id=' + bookId, chapter)
  },
  async fetchLatestIndex({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(process.env.baseUrl + '/chapters/latestindex?bookId=' + bookId)
      const {
        index
      } = res.data
      commit('SET_LATEST_INDEX', index)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  }

}
