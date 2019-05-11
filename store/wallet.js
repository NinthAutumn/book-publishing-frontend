export const state = () => ({
  wealth: 0,
  token: 0
})

export const getters = {
  getWealth: state => state.wealth,
  getToken: state => state.token
}

export const mutations = {
  SET_WEALTH(state, wealth) {
    state.wealth = wealth
  },
  SET_VOTE_TOKEN(state, token) {
    state.token = token
  }
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
      const res = await this.$axios.post('/transaction/chapter', {
        chapterId,
        amount,
        bookId,
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
      const res = await this.$axios.get('/user/wealth')
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
    form
  }) {
    try {
      const res = await this.$axios.post(`/transaction/coin`, {
        form
      })
    } catch (error) {

    }
  }
}
