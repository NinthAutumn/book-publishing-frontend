export const state = () => {
  reviews: []
}
export const getters = {
  // truncate: (state) => {
  //   const review = state.reviews.map((review) => {
  //     if (review.content.length > 350) {
  //       review.content = review.content.substring(0, 350) + '...'
  //     }
  //     return review
  //   })
  //   console.log(review);

  //   return review
  // }
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
