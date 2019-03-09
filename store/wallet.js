export const state = () => ({
  wealth: Number
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
    await this.$axios.patch(process.env.baseUrl + '/transaction/chapter', {
      bookId,
      chapterId,
      price
    })
  },
  async wealth({
    commit
  }, ) {

    const wealth = await this.$axios.get(process.env.baseUrl + '/users/wealth')
    commit('SET_WEALTH', wealth.data.wealth)
  }

}
