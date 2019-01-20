export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: ""
})

export const getters = {

}

export const mutations = {
  SHOW(state, chapter) {
    state.chapter = chapter
    state.chapterCover = chapter.bookId.cover
    // console.log(state.chapter);
  },
  infiniteNext(state, chapter) {
    state.chapter = chapter
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
      // console.log(res.data)
      commit('infiniteNext', res.data)
    })
  },
  async previousChapter({
    commit
  }) {

  }

}
