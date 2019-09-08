export const state = () => ({
  transactions: [],
  statistics: {},
  ranking: [],
  transactionPie: [],
  votesBar: {},
  banks: [],
  shops: [],
  totalCoins: 0,
  totalEarning: 0
})

export const getters = {
  getTransactions: state => state.transactions,
  getStats: state => state.statistics,
  getRanking: state => state.ranking,
  getTransactionPie: state => state.transactionPie,
  getVotesBar: state => state.votesBar,
  getBanks: state => state.banks,
  getShops: state => state.shops,
  getTotalCoins: state => state.totalCoins,
  getTotalEarning: state => state.totalEarning
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
  },
  SET_TOTAL_COINS: function (state, totalCoins) {
    state.totalCoins = totalCoins
  },
  SET_TOTAL_EARNING: function (state, totalEarning) {
    state.totalEarning = totalEarning
  }
}
export const actions = {
  async fetchTransactionList({
    commit
  }, {
    page,
    infinite = false,
    limit = 10
  }) {
    try {
      const res = await this.$axios.get(`/v2/analytic/transaction/history?page=${page}&limit=${limit}`)

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
      const res = await this.$axios.get(`/v2/analytic/earning/pie`)
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
        const res = await this.$axios.get(`/v2/analytic/user/stats`)
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
      const res = await this.$axios.get(`/v2/ranking/vote/user?type=${type}`)
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
    type,
    interval
  }) {
    try {
      const res = await this.$axios.get(`/v2/analytic/graph?time=${time}&type=${type}&interval=${interval}`)
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
      const res = await this.$axios.get(`/v2/analytic/pie?time=${time}&type=${type}`)
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
      const res = await this.$axios.get(`/v2/author/show/bank?query=${search}`)
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
      const res = await this.$axios.get(`/v2/author/show/bank/shop?query=${search}&bank=${bankCode}`)
      commit('SET_SHOPS', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchTotalCoins({
    commit
  }, {
    days
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/analytic/earning/total`)
      commit('SET_TOTAL_COINS', data.total)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchTotalEarning({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/analytic/earning/total`)
      commit('SET_TOTAL_EARNING', data.total)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchBookFunnel({
    commit
  }, {
    bookId
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/analytic/funnel/${bookId}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchBookStats({
    commit
  }, {
    bookId,
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/analytic/book/show/${bookId}`)
      commit('SET_STATISTICS', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
