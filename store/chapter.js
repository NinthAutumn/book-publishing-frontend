export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
  loading: false,
  toc: '',
  modal: '',
  cToc: '',
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
  }
}

export const mutations = {
  SHOW(state, chapter) {
    state.chapter = chapter
    state.chapterCover = chapter.bookId.cover
  },
  infiniteNext(state, chapter) {
    state.chapter = chapter
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
      volume.reverse()
    })
  },
  TOC_BOOK(state, toc) {
    state.cToc = toc
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
  }
}
export const actions = {
  async nextChapter({
    commit
  }, {
    chapterId,
    userId
  }) {
    // const nextindex = index
    if (userId) {
      await this.$axios.get(process.env.baseUrl + '/chapters/direct?chapterId=' + chapterId + '&user=' + userId).then((res) => {
        commit('infiniteNext', res.data)
      })
    } else {
      await this.$axios.get(process.env.baseUrl + '/chapters/direct?chapterId=' + chapterId).then((res) => {
        commit('infiniteNext', res.data)
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
  async createChapter({
    commit
  }, {
    chapter,
    bookId
  }) {
    await this.$axios.post(process.env.baseUrl + '/chapters/add?id=' + bookId, chapter)
  }

}
