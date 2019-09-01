export const state = () => ({
  drawings: [],
  chapter: []
})

export const getters = {
  getAllDrawings: (state) => state.drawings,
  getChapterDrawings: (state) => state.chapter
}

export const mutations = {
  SET_DRAWINGS: (state, drawings) => {
    state.drawings = drawings
  },
  SET_CHAPTER_DRAWINGS: (state, drawings) => {
    state.chapter = drawings
  }
}
export const actions = {
  fetchAllDrawings: async function ({
    commit
  }) {

    try {
      const {
        data
      } = await this.$axios.get('/v1/drawing/list')
      commit('SET_DRAWINGS', data.drawings)
      return Promise.resolve(data.drawings)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchChapterDrawings: async function ({
    commit
  }, {
    chapterId
  }) {
    try {
      const {
        data
      } = await this.$axios.get(
        `/v1/drawing/chapter/${chapterId}`
      );
      // console.log(data.drawings);
      commit('SET_CHAPTER_DRAWINGS', data.drawings)
      return Promise.resolve(data.drawings)
    } catch (error) {
      return Promise.reject(error)
    }

  }
  // setDrawing: async function({commit},{}){
  //   try {

  //   } catch (error) {

  //   }
  // }
}
