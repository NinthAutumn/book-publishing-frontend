// import {
//   stat
// } from "fs";

export const state = () => ({
  genre: {},
  randomGenre: [],
  views: {},
  ratings: {},
  bookmark: {},
  home: {}
})

export const getters = {

}

export const mutations = {
  SET_GENRE(state, genre) {
    state.genre = genre
    // console.log(genre);
  },
  SET_HOME(state, analysis) {
    state.home = analysis
  },
  SET_VIEW(state, view) {
    state.views = view
    // console.log(view);
  },
  SET_BOOKMARK(state, bookmark) {
    state.bookmark = bookmark
  },
  SET_RATING(state, rating) {
    state.ratings = rating
  }
}

export const actions = {
  async genreRanking({
    commit
  }, genre) {
    await this.$axios.get('/ranking/genre?genre=' + genre).then((res) => {
      commit('SET_GENRE', res.data[0])
    })
  },
  async viewRanking({
    commit
  }) {
    await this.$axios.get('/ranking/view').then((res) => {
      commit('SET_VIEW', res.data[0])
    })
  },
  async bookAnalysisRanking({
    commit
  }, {
    storeType,
    limit = 10
  }) {
    await this.$axios.get('/ranking/bookanalysis?store=' + storeType + '&limit=' + limit).then((res) => {
      if (storeType === 'rating') {
        commit('SET_RATING', res.data[0])
      } else if (storeType === 'bookmark') {
        commit('SET_BOOKMARK', res.data[0])
      }
    })
  },
  async bookAnalysisHomeRanking({
    commit
  }, {
    storeType,
    limit = 10
  }) {
    await this.$axios.get('/ranking/bookanalysis?store=' + storeType + '&limit=' + limit).then((res) => {
      commit('SET_HOME', res.data[0])
    })
  }
}
