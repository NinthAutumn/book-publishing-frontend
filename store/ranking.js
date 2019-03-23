// import {
//   stat
// } from "fs";

export const state = () => ({
  list: [],
  trending: [],
  ranking: {}
})

export const getters = {
  getRankingList: (state) => {
    return state.list
  },
  getTrendingList: (state) => {
    return state.trending
  }
}

export const mutations = {
  SET_RANKING_LIST(state, list) {
    state.list = list
  },
  SET_TRENDING_LIST(state, list) {
    state.trending = list
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
  },
  async fetchTrending({
    commit
  }, {
    days,
    limit,
    page
  }) {
    await this.$axios.get(`/ranking/trending?days=${days}&limit=${limit}&page=${page}`).then((res) => {
      commit('SET_TRENDING_LIST', res.data)
    })
  }
}
