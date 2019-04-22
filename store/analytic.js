export const state = () => ({
  trending: [],
  ranking: [],
  views: {},
  books: []
})

export const getters = {
  getTrendingList: state => state.trending,
  getRankingList: state => state.ranking,
  getTotalViews: state => state.views,
  getBookList: state => state.books
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
  }
}
