export const state = () => ({
  transactions: [],
  statistics: {},
  ranking: [],
  transactionGraph: [],
  transactionPie: []
})

export const getters = {
  getTransactions: state => state.transactions,
  getStats: state => state.statistics,
  getRanking: state => state.ranking,
  getTransactionGraph: state => state.transactionGraph,
  getTransactionPie: state => state.transactionPie
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
  },
  PUSH_TRANSACTIONS: (state, transactions) => {
    transactions.forEach((transaction) => {
      state.transactions.push(transaction)
    })
  },
  SET_TRANSACTION_GRAPH: (state, transactionGraph) => {
    state.transactionGraph = transactionGraph
  },
  SET_TRANSACTION_PIE: (state, transactionPie) => {
    state.transactionPie = transactionPie
  }
}
export const actions = {
  async fetchTransactionList({
    commit
  }, {
    page,
    infinite = false
  }) {
    try {
      const res = await this.$axios.get(`/analytic/dashboard/transactions?page=${page}`)

      if (infinite) {
        commit('PUSH_TRANSACTIONS', res.data)
      } else {
        commit('SET_TRANSACTIONS', res.data)
      }
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchTransactionGraph({
    commit
  }, {
    days
  }) {
    try {
      const res = await this.$axios.get(`/analytic/dashboard/earning/graph?days=${days}`)
      commit('SET_TRANSACTION_GRAPH', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async fetchTransactionPie({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/dashboard/earning/pie`)
      commit('SET_TRANSACTION_PIE', res.data)
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
