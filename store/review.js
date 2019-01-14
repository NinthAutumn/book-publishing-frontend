export const state = () => {
  reviews: []
}
export const getters = {

}

export const mutations = {
  GET_REVIEWS(state, reviews) {
    state.reviews = reviews
  }
}
export const actions = {
  async showAll({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + "/reviews/book?id=" + bookId).then((res) => {
      commit('GET_REVIEWS', res.data)
    })
  }
}
