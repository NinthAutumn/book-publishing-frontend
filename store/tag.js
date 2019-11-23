export const state = () => ({
  list: [],
  category: [],
})

export const getters = {
  getTagList: (state) => state.list,
  getCategoryList: state => state.category
}

export const mutations = {
  SET_TAGS: (state, tags) => state.list = tags,
  PUSH_TAGS: (state, tags) => state.list.push(...tags),
  SET_CATEGORY: (state, category) => state.category = category,
  PUSH_CATEGORY: (state, category) => state.category.push(...category),
}
export const actions = {
  async fetchCategoryList({
    commit
  }, {
    search,
    limit,
    page,
    infinite
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/tag/query/category?search=${search}&limit=${limit}&page=${page}`)
      // infinite ? commit('PUSH_CATEGORY', data) : commit('SET_CATEGORY', data)
      // if (data.error) {
      //   return Promise.reject(data.error)
      // }
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
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
