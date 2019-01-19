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
  },
  ADD_Review(state, reviews) {
    state.reviews.unshift(reviews)
  }
}
export const actions = {
  async showAll({
    commit
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + "/reviews/book?id=" + bookId).then((res) => {
      commit('GET_REVIEWS', res.data)
    })
  },
  async addReview({
    commit
  }, {
    review,
    bookId
  }) {
    let recommended = false
    if (review.rating > 3) {
      recommended = true
    }

    await this.$axios.post(process.env.baseUrl + '/reviews/add', {
      title: review.title,
      content: review.content,
      bookId: bookId,
      rating: review.rating,
      recommended: recommended
    }).then((res) => {
      commit('ADD_REVIEW', res.data)
    }).catch((e) => {

    })
  }
}
