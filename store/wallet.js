export const state = () => ({
  wealth: 0,
  token: 0,
  payout: []
})

export const getters = {
  getWealth: state => state.wealth,
  getToken: state => state.token,
  getPayoutList: state => state.payout
}

export const mutations = {
  SET_WEALTH: (state, wealth) => state.wealth = wealth,
  SET_VOTE_TOKEN: (state, token) => state.token = token,
  SET_PAYOUT_LIST: (state, payout) => state.payout = payout
}
export const actions = {
  async buyChapter({
    commit
  }, {
    bookId,
    chapterId,
    amount
  }) {
    try {
      const res = await this.$axios.post('/v2/transaction/chapter', {
        chapter_id: chapterId,
        amount,
        book_id: bookId,
        type: 'chapter'
      })
      if (res.data.error) {
        return Promise.reject(res.data.error)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }


  },
  async wealth({
    commit
  }, ) {
    try {
      const res = await this.$axios.get('/v2/user/show/wallet')
      if (res) {
        commit('SET_WEALTH', res.data.wealth)
        commit('SET_VOTE_TOKEN', res.data.vote_token)
      }

    } catch (error) {
      console.log(error.status);
      throw error
    }
  },
  async buyCoin({
    commit
  }, {
    sku_id
  }) {
    try {
      const res = await this.$axios.post(`/v2/transaction/coin`, {
        sku_id
      })
    } catch (error) {

    }
  },
  async patchRedeem({
    commit
  }, {
    transactionId
  }) {
    try {
      const res = await this.$axios.patch(`/v2/transaction/${transactionId}/redeem`)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchPayoutList: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/transaction/payout/list`)
      commit('SET_PAYOUT_LIST', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
