export default {
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
