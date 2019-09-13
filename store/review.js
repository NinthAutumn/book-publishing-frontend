// import auth from './auth'
export const state = () => ({
  reviews: [],
  goodReviews: [],
  reviewed: '',
  myReviews: [],
  myReview: {},
  nextChapterLength: 0,
  trending: [],
  count: 0,
  preview: [],
  review: {}
})
export const getters = {
  getReviews: (state) => {
    return state.reviews
  },
  getReview: (state) => state.review,
  getTrendingList: (state) => {
    return state.trending
  },
  getReviewCount: state => {
    return state.count
  },
  getMyReview: state => state.myReview,
  isReviewed: state => state.reviewed,
  getPreviewReviews: state => state.preview
}



export const mutations = {
  SET_NEXT_REVIEWS(state, reviews) {
    reviews.forEach((review) => {
      state.reviews.push(review)
    })
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
  GET_GOOD_REVIEWS(state, goodReviews) {
    goodReviews.forEach((review) => {
      state.goodReviews.push(review)

    })
  },
  GET_MYREVIEWS(state, reviews) {
    reviews.forEach((review) => {
      state.myReviews.push(review)
    })
  },
  GET_USER_REVIEW(state, review) {
    state.myReview = review
  },
  SET_NEXT_REVIEW_LENGTH(state, count) {
    state.nextChapterLength = count
  },
  SET_TRENDING(state, reviews) {
    reviews.forEach((review) => {
      state.trending.push(review)
    })
  },
  SET_REVIEW_COUNT(state, count) {
    state.count = count
  },
  SET_IS_REVIEWED: (state, reviewed) => {
    state.reviewed = reviewed
  },
  SET_PREVIEW: (state, reviews) => {
    state.preview = reviews
  },
  SET_REVIEW: (state, review) => {
    state.review = review
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
  async fetchReview({
    commit
  }, {
    id
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/review/${id}/show`);
      if (data.error) {
        return Promise.reject(data.error)
      }
      commit('SET_REVIEW', data)
    } catch (error) {
      return Promise.reject(error)

    }
  },
  async fetchBookReviewCount({
    commit
  }, {
    bookId
  }) {
    const {
      data
    } = await this.$axios.get(`/v2/review/book/${bookId}/count`)
    commit('SET_REVIEW_COUNT', data)
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
    direction,
    next = false,
    preview = false
  }) {
    const res = await this.$axios.get(`/v2/review/book?book_id=${bookId}&limit=${limit}&page=${page}&user_id=${userId}&direction=${direction}&type=${type}`)

    if (preview) {
      commit('SET_PREVIEW', res.data.reviews)
      return Promise.resolve()
    }
    if (next) {
      commit('SET_NEXT_REVIEWS', res.data.reviews)
      return Promise.resolve(res.data.reviews)
    }

    commit('SET_REVIEWS', res.data.reviews)
    return Promise.resolve(res.data.reviews)
  },
  async addReview({
    commit,
    rootState
  }, {
    review,
    bookId
  }) {
    let recommended = false
    if (review.rating > 3) {
      recommended = true
    }
    try {
      const {
        data
      } = await this.$axios.post('/v2/review', {
        title: review.title,
        content: review.content,
        book_id: bookId,
        rating: review.rating,
        recommended: recommended,
      })
      if (data.error) {
        return Promise.resolve(data)
      }
      return Promise.resolve({
        error: null
      })
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
      console.log(data);
      const res = await this.$axios.patch(`/v2/review/vote/${reviewId}`, {
        vote: data
      })
      // commit('CHANGE_LIKES')
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
  async myReview({
    commit
  }, {
    bookId
  }) {
    const review = await this.$axios.get(`/v2/review/user/${bookId}/show`)
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
    const update = await this.$axios.patch(`/v2/review/${id}`, review)
  },
  async fetchIsReviewed({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v2/review/${bookId}/reviewed`)
      commit('SET_IS_REVIEWED', res.data.reviewed)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async deleteReview({
    commit
  }, {
    reviewId
  }) {

  }
}
