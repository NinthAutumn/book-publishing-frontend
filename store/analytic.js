export const state = () => ({
  trending: [],
  ranking: [],
  views: {},
  books: [],
  recommended: [],
  comments: [],
  latest: [],
  reviews: [],
  voteRanking: [],
  frequent: [],
  funnel_select: []
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
  getVoteRanking: state => state.voteRanking,
  getFrequent: state => state.frequent,
  getFunnelBookList: state => state.funnel_select
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
  PUSH_COMMENTS: (state, comments) => {
    comments.forEach((comment) => {
      state.comments.push(comment)
    })
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
  },
  SET_FREQUENT: (state, frequent) => {
    state.frequent = frequent
  },
  SET_FUNNEL_SELECT(state, funnel) {
    state.funnel_select = funnel
  }
}
export const actions = {
  fetchTrending: async function ({
    commit
  }, {
    time,
    page,
    limit = 12,
    infinite,
    authors = false,
    genres = false
  }) {
    try {
      const res = await this.$axios.get(`/v2/ranking/trending?time=${time}&page=${page}&limit=${limit}&authors=${authors? authors: ''}&genres=${genres? genres: ''}`)
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
        res = await this.$axios.get(`/v2/ranking/default/genre?period=${time}&page=${page}&genre=${genre}&limit=${limit}`)
      } else {
        res = await this.$axios.get(`/v2/ranking?period=${time}&page=${page}&limit=${limit}`)
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
      const res = await this.$axios.get(`/v2/analytic/graph/view?time=${type}&type=view`)
      commit('SET_VIEWS', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      console.log(error);
    }
  },
  fetchFunnelSelectList: async function ({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/analytic/select/funnel`)
      commit('SET_FUNNEL_SELECT', data)
      return Promise.resolve(data)
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserBooks: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/book/user/list`)
      commit('SET_BOOKS', res.data)
      return Promise.resolve(res.data)

    } catch (error) {
      console.log(error);
    }
  },
  fetchUserComments: async function ({
    commit
  }, {
    limit = 10,
    page = 1,
    infinite = false,
  }) {
    try {
      // return
      const res = await this.$axios.get(`/v2/comment/user/book/list?page=${page}&limit=${limit}`)
      if (infinite) {
        comment('PUSH_COMMENTS', res.data)
      } else {
        commit('SET_COMMENTS', res.data)

      }
      return Promise.resolve(res.data)

    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchRecommended: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/book/show/recommended`)
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
      const res = await this.$axios.get(`/v2/book/show/latest`)
      commit('SET_LATEST', res.data)
      return Promise.resolve(res.data)

    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchHighFrequent: async function ({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get('/v2/analytic/book/highfrequency')
      commit('SET_FREQUENT', data)
    } catch (error) {
      console.log(error);
    }
  },
  fetchTrendingReviews: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/analytic/review/trending`)
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
      const res = await this.$axios.get(`/v2/ranking/vote?period=${time}&page=${page}&limit=${limit}`)
      if (infinite) {
        commit('PUSH_VOTE_RANKING', res.data)
      } else {
        commit('SET_VOTE_RANKING', res.data)
      }

      return Promise.resolve(res.data)

    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  },
}
