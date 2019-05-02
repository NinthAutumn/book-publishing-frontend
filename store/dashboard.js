export const state = () => ({
  transactions: [],
  statistics: {},
  ranking: []
})

export const getters = {
  getTransactions: state => state.transactions,
  getStats: state => state.statistics,
  getRanking: state => state.ranking
}

export const mutations = {
  SET_TRANSACTIONS: (state, transactions) => {
    state.transactions = transactions
  },
  SET_STATISTICS: (state, statistics) => {
    state.statistics = statistics
  },
  SET_RANKING: (state, ranking) => {
    state.ranking = ranking
  }
}
export const actions = {
  async fetchTransactionList({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/dashboard/transactions`)
      commit('SET_TRANSACTIONS', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchStatistics({
    commit
  }) {
    try {
      try {
        const res = await this.$axios.get(`/analytic/dashboard/stats`)
        commit('SET_STATISTICS', res.data)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    } catch (error) {

    }
  },
  async fetchRanking({
    commit
  }) {
    try {
      try {
        const res = await this.$axios.get(`/analytic/dashboard/ranking`)
        commit('SET_RANKING', res.data)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    } catch (error) {

    }
  },
}
