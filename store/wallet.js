export const state = () => ({
  wealth: 0
})

export const getters = {
  getWealth: state => state.wealth
}

export const mutations = {
  SET_WEALTH(state, wealth) {
    state.wealth = wealth
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
      console.log(res.data);
      if (res) {
        commit('SET_WEALTH', res.data.wealth)
      }

    } catch (error) {
      console.log(error.status);
      throw error
    }

  }

}
