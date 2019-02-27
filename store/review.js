// import auth from './auth'
export const state = () => ({
  reviews: [],
  goodReviews: [],
  reviewed: ''
})
export const getters = {
  allReviews: (
    state
  ) => {
    return state.reviews
  }
}


export const mutations = {
  GET_REVIEWS(state, reviews) {
    state.reviews = reviews
  },
  ADD_REVIEW(
    state, {
      reviews
    }
  ) {

    state.reviews.unshift(reviews)
  },
  LIKED_REVIEWS(state, reviewId) {
    state.reviews.forEach((review) => {
      if (review._id === reviewId) {
        review.like = review.like + 1
      }
    })
  },
  UNLIKED_REVIEWS(state, reviewId) {
    state.reviews.forEach((review) => {
      if (review._id === reviewId) {
        review.like = review.like - 1
      }
    })
  },
  USER_LIKED_REVIEWS(state, userId) {
    state.reviews.forEach((review) => {
      if (review.ratedBy) {
        review.ratedBy.forEach((rate) => {
          if (rate.userId === userId) {
            if (rate.type === 'like') {
              review.liked = true
            } else {
              review.disliked = true
            }
          }
        })
      }

    })
  },
  GET_GOOD_REVIEWS(state, goodReviews) {
    state.goodReviews = goodReviews
  },
  GET_REVIEWED(state, status) {
    state.reviewed = status
  }
}
export const actions = {
  async showAll({
    commit,
    rootState
  }, bookId) {
    await this.$axios.get(process.env.baseUrl + "/reviews/book?id=" + bookId).then(async (res) => {
      commit('GET_REVIEWS', res.data)
      // commit('USER_LIKED_REVIEWS', rootState.auth.user)
      if (rootState.auth.loggedIn) {
        await this.$axios.get(process.env.baseUrl + '/users/liked').then((res) => {
          commit('USER_LIKED_REVIEWS', rootState.auth.user._id)
        })
      }
    })
  },
  async addReview({
    commit,
    rootState
  }, {
    review,
    bookId,
    username
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
      recommended: recommended,
      author: username
    }).then((res) => {
      commit('ADD_REVIEW', {
        reviews: res.data
      })
    }).catch((e) => {

    })
  },
  async likeReview({
    commit
  }, {
    reviewId,
    type
  }) {
    await this.$axios.patch(process.env.baseUrl + '/reviews/like', {
      id: reviewId,
      type: type
    }).then((res) => {
      commit('LIKED_REVIEWS', reviewId)
    }).catch((d) => {
      console.log(d);
    })
  },
  async unLikeReview({
    commit
  }, {
    reviewId,
    type
  }) {
    await this.$axios.patch(process.env.baseUrl + '/reviews/unlike', {
      id: reviewId,
      type: type
    }).then((res) => {
      commit('UNLIKED_REVIEWS', reviewId)
    }).catch((e) => {
      console.log(e);
    })
  },
  async mostLiked({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/reviews/mostLikedToday').then((res) => {
      commit('GET_GOOD_REVIEWS', res.data)
    })
  },
  async reviewedStatus({
    commit
  }, bookId) {
    const status = await this.$axios.get(process.env.baseUrl + '/reviews/check?bookId=' + bookId)
    commit('GET_REVIEWED', status.data.checked)
  }
}
