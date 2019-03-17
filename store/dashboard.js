export const state = () => ({
  totalViews: []
})

export const getters = {
  getTotalViews: (state) => {
    return state.totalViews
  },
}

export const mutations = {
  SET_TOTAL_VIEWS(state, statistic) {
    state.totalViews = statistic
  }
}
export const actions = {
  async fetchTotalViews({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/data/totalviews`)
      commit('SET_TOTAL_VIEWS', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
