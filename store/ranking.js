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
  }) {
    await this.$axios.get('/ranking/total').then((res) => {
      commit('SET_RANKING_LIST', res.data)
    })
  }
}
