// import {
//   stat
// } from "fs";

export const state = () => ({
  list: [],
  ranking: {}
})

export const getters = {
  getRankingList: (state) => {
    return state.list
  }
}

export const mutations = {
  SET_RANKING_LIST(state, list) {
    state.list = list
  },

}

export const actions = {
  async fetchRanking({
    commit
  }, {
    days,
    limit,
    page
  }) {

    await this.$axios.get(`/ranking/total?days=${days}&limit=${limit}&page=${page}`).then((res) => {
      commit('SET_RANKING_LIST', res.data)
    })
  }
}
