export default {
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
