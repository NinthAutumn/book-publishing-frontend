// import auth from './auth'
export const state = () => ({
  reviews: [],
  goodReviews: [],
  reviewed: ''
})
export const getters = {
  // truncate: (state) => {
  //   const review = state.reviews.map((review) => {
  //     if (review.content.length > 350) {
  //       review.content = review.content.substring(0, 350) + '...'
  //     }
  //     return review
  //   })

  //   return review
  // }
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
  USER_LIKED_REVIEWS(state, likedReviews) {
    state.reviews.forEach((review) => {
      likedReviews.forEach((reviewId) => {
        if (review._id === reviewId) {
          review.liked = true
        }
      })
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
          commit('USER_LIKED_REVIEWS', res.data.reviews)
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
  }, reviewId) {
    await this.$axios.patch(process.env.baseUrl + '/reviews/like', {
      id: reviewId
    }).then((res) => {
      commit('LIKED_REVIEWS', reviewId)
    }).catch((d) => {
      console.log(d);
    })
  },
  async unLikeReview({
    commit
  }, reviewId) {
    await this.$axios.patch(process.env.baseUrl + '/reviews/unlike', {
      id: reviewId
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
    const status = await this.$axios.get(process.env.baseUrl + '/reviews/check?bookId' + bookId)
    commit('GET_REVIEWED', status.data.checked)
  }
}
