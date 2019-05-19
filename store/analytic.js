export const state = () => ({
  trending: [],
  ranking: [],
  views: {},
  books: [],
  recommended: [],
  comments: [],
  latest: [],
  reviews: [],
  voteRanking: []
})

export const getters = {
  getTrendingList: state => state.trending,
  getRankingList: state => state.ranking,
  getTotalViews: state => state.views,
  getBookList: state => state.books,
  getRecommended: state => state.recommended,
  getComments: state => state.comments,
  getLatest: state => state.latest,
  getTrendingReviews: state => state.reviews,
  getVoteRanking: state => state.voteRanking
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
  },
  SET_VOTE_RANKING: (state, voteRanking) => {
    state.voteRanking = voteRanking
  },
  PUSH_VOTE_RANKING: (state, voteRanking) => {
    voteRanking.forEach((book) => {
      state.voteRanking.push(book)
    })
  },
  PUSH_TRENDING: (state, trending) => {
    trending.forEach((book) => {
      state.trending.push(book)
    })
  },
  PUSH_RANKING: (state, ranking) => {
    ranking.forEach((book) => {
      state.ranking.push(book)
    })
  }
}
export const actions = {
  fetchTrending: async function ({
    commit
  }, {
    time,
    page,
    infinite
  }) {
    try {
      const res = await this.$axios.get(`/analytic/trending?time=${time}&page=${page}`)
      if (infinite) {
        commit('PUSH_TRENDING', res.data)
      } else {
        commit('SET_TRENDING', res.data)
      }

      return Promise.resolve(res.data)
    } catch (error) {}

  },
  fetchRanking: async function ({
    commit
  }, {
    time,
    page,
    genre,
    limit = 10,
    infinite
  }) {
    try {
      let res = ""
      if (genre) {
        res = await this.$axios.get(`/analytic/ranking/genre?time=${time}&page=${page}&genre=${genre}&limit=${limit}`)
      } else {
        res = await this.$axios.get(`/analytic/ranking?time=${time}&page=${page}`)
      }
      if (infinite) {
        commit('PUSH_RANKING', res.data)
      } else {
        commit('SET_RANKING', res.data)

      }
      return Promise.resolve(res.data)

    } catch (error) {}
  },
  fetchUserViews: async function ({
    commit
  }, {
    type
  }) {
    try {
      const res = await this.$axios.get(`/analytic/book/views?time=${type}`)
      commit('SET_VIEWS', res.data)
      return Promise.resolve(res.data)
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
      return Promise.resolve(res.data)

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
      return Promise.resolve(res.data)

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
      return Promise.resolve(res.data)

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
      return Promise.resolve(res.data)

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
      return Promise.resolve(res.data)

    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchVoteRanking: async function ({
    commit
  }, {
    time,
    page,
    infinite,
    limit = 10
  }) {
    try {
      const res = await this.$axios.get(`/analytic/vote?time=${time}&page=${page}&limit=${limit}`)
      if (infinite) {
        commit('PUSH_VOTE_RANKING', res.data)
      } else {
        commit('SET_VOTE_RANKING', res.data)
      }

      return Promise.resolve(res.data)

    } catch (error) {
      return Promise.reject(error)
    }
  },
}