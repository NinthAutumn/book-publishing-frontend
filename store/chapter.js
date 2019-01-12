export const state = () => ({
  chapter: {}
})

export const getters = {

}

export const mutations = {
  SHOW(state, chapter) {
    state.chapter = chapter
    // console.log(state.chapter);
  }
}
export const actions = {
  async getChapter({
    commit
  }, chapterId) {
    await this.$axios.get(process.env.baseUrl + '/chapters/show?id=' + chapterId).then((res) => {
      commit('SHOW', res.data)
    })
  }

}
