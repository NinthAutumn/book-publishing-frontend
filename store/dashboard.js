export const state = () => ({
  transactions: [],
  statistics: {},
  ranking: [],
  transactionPie: [],
  votesBar: {},
  banks: [],
  shops: []
})

export const getters = {
  getTransactions: state => state.transactions,
  getStats: state => state.statistics,
  getRanking: state => state.ranking,
  getTransactionPie: state => state.transactionPie,
  getVotesBar: state => state.votesBar,
  getBanks: state => state.banks,
  getShops: state => state.shops
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
  SET_TRANSACTION_PIE: (state, transactionPie) => {
    state.transactionPie = transactionPie
  },
  SET_VOTES_BAR: (state, votesBar) => {
    state.votesBar = votesBar
  },
  SET_BANKS: function (state, banks) {
    state.banks = banks
  },
  SET_SHOPS: function (state, shops) {
    state.shops = shops
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
        return Promise.resolve(res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    } catch (error) {

    }
  },
  async fetchRanking({
    commit
  }, {
    type
  }) {

    try {
      const res = await this.$axios.get(`/analytic/dashboard/ranking?type=${type}`)
      commit('SET_RANKING', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async fetchMainAnalytics({
    commit
  }, {
    time,
    type
  }) {
    try {
      const res = await this.$axios.get(`/analytic/dashboard/main?time=${time}&type=${type}`)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchPieAnalytics({
    commit
  }, {
    type,
    time
  }) {
    try {
      const res = await this.$axios.get(`/analytic/dashboard/pie?time=${time}&type=${type}`)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchBanks({
    commit
  }, {
    search
  }) {
    try {
      const res = await this.$axios.get(`/author/bank?search=${search}`)
      commit('SET_BANKS', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchShops({
    commit
  }, {
    search,
    bankCode
  }) {
    try {
      const res = await this.$axios.get(`/author/bank/shop?search=${search}&bankCode=${bankCode}`)
      commit('SET_SHOPS', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
