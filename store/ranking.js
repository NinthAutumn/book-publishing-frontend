export const state = () => ({
  genre: {},
  views: {},
  ratings: [],
  bookmark: []
})

export const getters = {

}

export const mutations = {
  SET_GENRE(state, genre) {
    state.genre = genre
    console.log(genre);
  }
}

export const actions = {
  async genreRanking({
    commit
  }, genre) {
    await this.$axios.get(process.env.baseUrl + '/ranking/genre?genre=' + genre).then((res) => {
      commit('SET_GENRE', res.data[0])
    })

  }
}
