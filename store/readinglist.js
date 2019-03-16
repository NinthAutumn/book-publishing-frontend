export const state = () => ({
  show: {},
  list: []
})

export const getters = {

}

export const mutations = {
  SHOW(state, list) {

  },
  EDIT(state) {

  }

}

export const actions = {
  getList: async ({
    commit
  }) => {

  },
  createList: async ({
    commit
  }, readinglist) => {
    const create = await this.$axios.post(process.env.baseUrl + '/api/readinglist/new', readinglist)
  },
  addBook: async ({
    commit
  }, readinglist) => {
    const add = await this.$axios.patch(process.env.baseUrl + '/api/readinglist/addbook', readinglist)
  },
  removeBook: async ({
    commit
  }) => {
    const remove = await this.$axios.patch(process.env.baseUrl + '/api/readinglist/removebook', readinglist)
  },
  followList: async ({
    commit
  }) => {

  }
}
