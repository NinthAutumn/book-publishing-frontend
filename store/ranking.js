// import {
//   stat
// } from "fs";

export const state = () => ({
  list: [],
  trending: [],
  ranking: {},
  rankings: {},
  voteRanking: []
})

export const getters = {
  getRankingList: (state) => {
    return state.list
  },
  getTrendingList: (state) => {
    return state.trending
  },
  getRankingsList: state => state.rankings,
  getBookRanking: state => state.ranking,
  getVoteRanking: state => state.voteRanking,

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
  },
  SET_VOTE_RANKING: (state, voteRanking) => {
    state.voteRanking = voteRanking
  },
}

export const actions = {
  fetchVoteRanking: async function ({
    commit
  }, {
    time,
    page,
    infinite,
    limit = 10
  }) {
    try {
      const res = await this.$axios.get(`/v2/ranking/vote?period=${time}&page=${page}&limit=${limit}`)
      if (infinite) {
        commit('PUSH_VOTE_RANKING', res.data)
      } else {
        commit('SET_VOTE_RANKING', res.data)
      }
      return Promise.resolve(res.data)
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  },
  async fetchRanking({
    commit
  }, {
    days,
    limit,
    page
  }) {

    await this.$axios.get(`/v1/analytic/book/rankinglist?days=${days}&limit=${limit}&page=${page}`).then((res) => {
      commit('SET_RANKING_LIST', res.data)
    })
  },
  async fetchHomeRankingList({
    commit
  }) {
    const res = await this.$axios.get(`/v2/ranking/mobile/ranking`)
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
    await this.$axios.patch(`/v1/analytic/book/genreranking?days=${days}&limit=${limit}&page=${page}`, {
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
      await this.$axios.post(`/v1/analytic/book/trending?bookId=${bookId}`)
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
      } = await this.$axios.get(`/v2/ranking/${bookId}/vote?type=${type}&period=${period}`)
      if (data.error) {
        return Promise.reject(data.error)
      }
      commit('SET_BOOK_RANKING', data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
