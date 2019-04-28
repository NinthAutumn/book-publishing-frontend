export const state = () => ({
  trending: [],
  ranking: [],
  views: {},
  books: [],
  recommended: [],
  comments: [],
  latest: [],
  reviews: []
})

export const getters = {
  getTrendingList: state => state.trending,
  getRankingList: state => state.ranking,
  getTotalViews: state => state.views,
  getBookList: state => state.books,
  getRecommended: state => state.recommended,
  getComments: state => state.comments,
  getLatest: state => state.latest,
  getTrendingReviews: state => state.reviews
}

export const mutations = {
  SET_TRENDING: (state, trending) => {
    state.trending = trending
  },
  SET_RANKING: (state, ranking) => {
    state.ranking = ranking
  },
  SET_VIEWS: (state, views) => {
    state.views = views
  },
  SET_BOOKS: (state, books) => {
    state.books = books
  },
  SET_RECOMMENDED: (state, books) => {
    state.recommended = books
  },
  SET_COMMENTS: (state, comments) => {
    state.comments = comments
  },
  SET_LATEST: (state, latest) => {
    state.latest = latest
  },
  SET_REVIEW_TRENDING: (state, reviews) => {
    state.reviews = reviews
  }
}
export const actions = {
  fetchTrending: async function ({
    commit
  }, {
    time
  }) {
    try {
      const res = await this.$axios.get(`/analytic/trending?time=${time}`)
      commit('SET_TRENDING', res.data)
    } catch (error) {}

  },
  fetchRanking: async function ({
    commit
  }, {
    time
  }) {
    try {
      const res = await this.$axios.get(`/analytic/ranking?time=${time}`)
      commit('SET_RANKING', res.data)
    } catch (error) {}
  },
  fetchUserViews: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/book/views`)
      commit('SET_VIEWS', res.data)
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserBooks: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/book/list`)
      commit('SET_BOOKS', res.data)
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserComments: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/comment/list`)
      commit('SET_COMMENTS', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchRecommended: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/home/recommended`)
      commit('SET_RECOMMENDED', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchLatest: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/book/latest`)
      commit('SET_LATEST', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchTrendingReviews: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/analytic/review/trending`)
      commit('SET_REVIEW_TRENDING', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
