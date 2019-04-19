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
    price
  }) {
    await this.$axios.patch('/transaction/chapter', {
      bookId,
      chapterId,
      price
    })

  },
  async wealth({
    commit
  }, ) {
    try {
      const res = await this.$axios.get('/user/wealth')
      if (res) {
        commit('SET_WEALTH', res.data.wealth)
      }

    } catch (error) {
      console.log(error.status);
      throw error
    }

  }

}
