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
    // console.log(view);
  },
  HOME_RATING(state) {
    state.home.total.forEach(async (book) => {
      book._id.book[0].ratings = +book._id.book[0].ratings.toFixed(2)
    })
  },
  BOOKMARK_RATING(state) {
    state.bookmark.total.forEach(async (book) => {
      book._id.book[0].ratings = +book._id.book[0].ratings.toFixed(2)
    })
  },
  VIEW_RATING(state) {
    state.views.total.forEach(async (book) => {
      book._id.book[0].ratings = +book._id.book[0].ratings.toFixed(2)
    })
  },
  RATING_RATING(state) {
    state.ratings.total.forEach(async (book) => {
      book._id.book[0].ratings = +book._id.book[0].ratings.toFixed(2)
    })
  }
}

export const actions = {
  async genreRanking({
    commit
  }, genre) {
    await this.$axios.get(process.env.baseUrl + '/ranking/genre?genre=' + genre).then((res) => {
      commit('SET_GENRE', res.data[0])
    })

  },
  async viewRanking({
    commit
  }) {
    await this.$axios.get(process.env.baseUrl + '/ranking/view').then((res) => {
      commit('SET_VIEW', res.data[0])
      commit('VIEW_RATING')
    })
  },
  async bookAnalysisRanking({
    commit
  }, {
    storeType,
    limit = 10
  }) {
    await this.$axios.get(process.env.baseUrl + '/ranking/bookanalysis?store=' + storeType + '&limit=' + limit).then((res) => {
      if (storeType === 'rating') {
        commit('SET_RATING', res.data[0])
        commit('RATING_RATING')
      } else if (storeType === 'bookmark') {
        commit('SET_BOOKMARK', res.data[0])
        commit('BOOKMARK_RATING')
      }

      // console.log(res.data[0]);

      // console.log(res.data);
    })
  },
  async bookAnalysisHomeRanking({
    commit
  }, {
    storeType,
    limit = 10
  }) {
    await this.$axios.get(process.env.baseUrl + '/ranking/bookanalysis?store=' + storeType + '&limit=' + limit).then((res) => {
      commit('SET_HOME', res.data[0])
      commit('HOME_RATING')
    })
  }
  // async bookmarkRanking({
  //   commit
  // }) {
  //   await this.$axios.get(process.env.baseUrl + '/ranking/bookmark').then((res) => {
  //     commit('SET_BOOKMARK', res.data[0])
  //     // console.log(res.data[0]);
  //     commit('RATING_RATING')
  //     // console.log(res.data);
  //   })
  // }
}
