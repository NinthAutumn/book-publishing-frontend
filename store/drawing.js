export const state = () => ({
  drawings: []
})

export const getters = {
  getAllDrawings: (state) => state.drawings,
  getChapterDrawings: (state) => state.drawings
}

export const mutations = {
  SET_DRAWINGS: (state, drawings) => {
    state.drawings = drawings
  }
}
export const actions = {
  fetchAllDrawings: async function ({
    commit
  }) {

    try {
      const {
        data
      } = await this.$axios.get('/drawing/list')
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
        `/drawing/chapter/${chapterId}`
      );
      commit('SET_DRAWINGS', data.drawings)
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
