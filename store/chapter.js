export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
  toc: '',
  modal: ''
})

export const getters = {

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
  TOC_CLOSE(state) {
    state.modal = ''
  },
  TOC_REVERSE(state) {
    state.toc = state.toc.reverse()
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
    bookId,
    index
  }) {
    // const nextindex = index
    await this.$axios.get(process.env.baseUrl + '/chapters/direct?id=' + bookId + '&' + 'index=' + index).then((res) => {
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
      return commit('TOC_CLOSE')
    }
    await this.$axios.get(process.env.baseUrl + '/chapters/toc?bookId=' + bookId).then((res) => {
      commit('TOC', res.data)
    })
  }

}
