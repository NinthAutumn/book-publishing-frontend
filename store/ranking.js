// import {
//   stat
// } from "fs";

export const state = () => ({
  list: [],
  trending: [],
  ranking: {},
  rankings: {}
})

export const getters = {
  getRankingList: (state) => {
    return state.list
  },
  getTrendingList: (state) => {
    return state.trending
  },
  getRankingsList: state => state.rankings,
  getBookRanking: state => state.ranking
}

export const mutations = {
  SET_RANKING_LIST(state, list) {
    state.list = list
  },
  SET_TRENDING_LIST(state, list) {
    state.trending = list
  },
  SET_RANKINGS(state, list) {
    state.rankings = list
  },
  SET_BOOK_RANKING(state, ranking) {
    state.ranking = ranking
  }
}

export const actions = {
  async fetchRanking({
    commit
  }, {
    days,
    limit,
    page
  }) {

    await this.$axios.get(`/analytic/book/rankinglist?days=${days}&limit=${limit}&page=${page}`).then((res) => {
      commit('SET_RANKING_LIST', res.data)
    })
  },
  async fetchHomeRankingList({
    commit
  }) {
    const res = await this.$axios.get(`/ranking/mobile/home`)
    commit('SET_RANKINGS', res.data)
  },
  async fetchGenreRanking({
    commit
  }, {
    days,
    limit,
    page,
    genre
  }) {
    await this.$axios.patch(`/analytic/book/genreranking?days=${days}&limit=${limit}&page=${page}`, {
      genre
    }).then((res) => {
      commit('SET_RANKING_LIST', res.data)
    })
  },
  async postVote({
    commit
  }, {
    bookId
  }) {
    try {
      await this.$axios.post(`/analytic/book/trending?bookId=${bookId}`)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchBookRanking({
    commit
  }, {
    bookId,
    type,
    period
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/ranking/${bookId}?type=${type}&period=${period}`)
      if (data.error) {
        return Promise.reject(data.error)
      }
      commit('SET_BOOK_RANKING', data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
