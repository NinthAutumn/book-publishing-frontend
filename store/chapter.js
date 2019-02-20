export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
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
    state.modal = 'table'
  },
  IMAGE(state) {
    state.modal = 'image'
  },
  SETTING(state) {
    state.modal = 'setting'
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
  }
}
export const actions = {
  async getChapter({
    commit
  }, chapterId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/show?id=' + chapterId).then((res) => {
      commit('SHOW', res.data)
    })

  },
  async nextChapter({
    commit
  }, {
    chapterId,
    userId
  }) {
    // const nextindex = index
    await this.$axios.get(process.env.baseUrl + '/chapters/direct?chapterId=' + chapterId + '&user=' + userId).then((res) => {
      commit('infiniteNext', res.data)
    })
  },
  async previousChapter({
    commit
  }) {

  },
  async tableOfContent({
    commit,
    state
  }, bookId) {
    if (state.modal === 'table') {
      return commit('MODAL_CLOSE')
    }
    await this.$axios.get(process.env.baseUrl + '/chapters/toc?bookId=' + bookId).then((res) => {
      commit('TOC', res.data)
    })
  },
  async TOCBook({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/toc?bookId=' + bookId).then((res) => {
      commit('TOC_BOOK', res.data)
    })
  },
  async dashboardTOC({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/dashboard?bookId=' + bookId).then((res) => {
      commit('D_TOC', res.data)
      // console.log(res.data.undefined);
    })
  },
  async publishedTOC({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/published?bookId=' + bookId).then((res) => {
      commit('P_TOC', res.data)
      // console.log(res.data.undefined);

    })
  }

}
