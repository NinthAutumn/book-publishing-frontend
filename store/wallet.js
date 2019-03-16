export const state = () => ({
  wealth: 0
})

export const getters = {

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
    price
  }) {
    await this.$axios.patch(process.env.baseUrl + '/api/transaction/chapter', {
      bookId,
      chapterId,
      price
    })

  },
  async wealth({
    commit
  }, ) {
    try {
      const res = await this.$axios.get(process.env.baseUrl + '/api/user/wealth')
      commit('SET_WEALTH', res.data.wealth)
    } catch (error) {
      console.log(error.status);
      throw error
    }

  }

}
