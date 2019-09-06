export const state = () => ({
  list: []
})

export const getters = {
  getTagList: (state) => state.list
}

export const mutations = {
  SET_TAGS: (state, tags) => {
    state.list = tags
  },
  PUSH_TAGS: (state, tags) => {
    tags.forEach((tag) => {
      state.tags.push(tag)
    })
  }
}
export const actions = {
  fetchTagList: async function ({
    commit
  }, {
    search,
    limit,
    page,
    infinite = false
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/tag/query?search=${search}&limit=${limit}&page=${page}`)
      infinite ? commit('PUSH_TAGS', data) : commit('SET_TAGS', data)
      if (data.error) {
        return Promise.reject(data.error)
      }
      return Promise.resolve({
        tags: data
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
