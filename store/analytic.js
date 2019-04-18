export const state = () => ({
  trending: []
})

export const getters = {
  getTrending: state => state.trending
}

export const mutations = {
  SET_TRENDING: (state, trending) => {
    state.trending = trending
  }
}
export const actions = {
  fetchTrending: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get('/analytic/trending')
      commit('SET_TRENDING', res.data)
    } catch (error) {

    }

  },
}
