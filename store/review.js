// import auth from './auth'
export const state = () => ({
  reviews: [],
  goodReviews: [],
  reviewed: '',
  myReviews: [],
  myReview: {},
  nextChapterLength: 0,
  trending: [],
  count: 0
})
export const getters = {
  getReviews: (state) => {
    return state.reviews
  },
  getTrendingList: (state) => {
    return state.trending
  },
  getReviewCount: state => {
    return state.count
  },
  getMyReview: state => state.myReviews
}



export const mutations = {
  SET_NEXT_REVIEWS(state, review) {
    state.reviews.push(review)
  },
  SET_REVIEWS(state, reviews) {
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
  },
  GET_MYREVIEWS(state, reviews) {
    state.myReviews = reviews
  },
  GET_USER_REVIEW(state, review) {
    state.myReview = review
  },
  SET_NEXT_REVIEW_LENGTH(state, count) {
    state.nextChapterLength = count
  },
  SET_TRENDING(state, reviews) {
    state.trending = reviews
  },
  SET_REVIEW_LENGTH(state, count) {
    state.count = count
  }
}
export const actions = {
  async fetchNextReviews({
    commit,
    rootState
  }, {
    bookId,
    limit = 10,
    page = 2,
    userId = "",
    direction,
    type
  }) {
    // await this.$axios.get(`/review/book?bookId=${bookId}&limit=${limit}&page=${page}&userId=${userId}&direction=${direction}`).then(async (res) => {
    //   res.data.forEach((review) => {
    //     commit('SET_NEXT_REVIEWS', review)
    //   })
    //   commit('SET_NEXT_REVIEW_LENGTH', res.data.length)

    // })
  },
  async showAll({
    commit,
    rootState
  }, {
    bookId,
    limit = 10,
    page = 1,
    userId = "",
    type,
    direction
  }) {
    await this.$axios.get(`/review/book?bookId=${bookId}&limit=${limit}&page=${page}&userId=${userId}&direction=${direction}&type=${type}`).then(async (res) => {
      commit('SET_REVIEWS', res.data.reviews)
      commit('SET_REVIEW_LENGTH', res.data.review_count)
    })
  },
  async addReview({
    commit,
    rootState
  }, {
    review,
    bookId
  }) {
    let recommended = false
    if (review.rating.total > 3) {
      recommended = true
    }
    try {
      await this.$axios.post('/review/add', {
        title: review.title,
        content: review.content,
        bookId: bookId,
        rating: review.rating,
        recommended: recommended,
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async likeReview({
    commit
  }, {
    reviewId,
    data
  }) {
    try {
      const res = await this.$axios.patch('/review/vote', {
        reviewId: reviewId,
        data: data
      })
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  },
  async unLikeReview({
    commit
  }, {
    reviewId,
    type
  }) {
    await this.$axios.patch('/review/unlike', {
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
    await this.$axios.get('/review/mostLikedToday').then((res) => {
      commit('GET_GOOD_REVIEWS', res.data)
    })
  },
  async reviewedStatus({
    commit
  }, bookId) {
    const status = await this.$axios.get('/review/check?bookId=' + bookId)
    if (!status) {
      return
    }
    commit('GET_REVIEWED', status.data.checked)
  },
  async userReviews({
    commit
  }) {
    const res = await this.$axios.get('/review/my')
    if (!res) {
      return
    }
    commit('GET_MYREVIEWS', res.data)
  },
  async myReview({
    commit
  }, {
    bookId
  }) {
    const review = await this.$axios.get('/review/myreview?bookId=' + bookId)
    if (!review) {
      return
    }
    commit('GET_USER_REVIEW', review.data)
  },
  async updateReview({
    commit
  }, {
    id,
    review
  }) {
    const update = await this.$axios.patch('/review/review?id=' + id, {
      review
    })
  },
  async fetchTrendingReviews({
    commit
  }, {
    days
  }) {
    try {
      const res = await this.$axios.get(`/analytic/review/trending?days=${days}`)
      commit('SET_TRENDING', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
