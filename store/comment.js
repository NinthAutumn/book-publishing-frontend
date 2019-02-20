export const state = () => ({
  comments: []
})

export const getters = {

}


const filterParent = function (items, id = undefined) {
  return items.filter((item) => {
    return item.parent === id
  }).map((filteredItem) => ({
    ...filteredItem,
    children: filterParent(items, filteredItem._id)
  }))
}


export const mutations = {
  GET_COMMENTS(state, comments) {
    const nestedParent = filterParent(comments)

    state.comments = nestedParent
  }

}

export const actions = {
  async getComments({
    commit
  }, {
    chapterId
  }) {
    await this.$axios.get(process.env.baseUrl + '/comments/show?chapterId=' + chapterId).then(async (res) => {
      commit('GET_COMMENTS', res.data)
    })
  },
  async addComment({
    commit
  }, {
    bookId,
    chapterIndex,
    content,
    parent
  }) {
    await this.$axios.post(process.env.baseUrl + '/comments/add', {
      bookId,
      chapterIndex,
      content,
      parent
    })
  },
  async addParentlessComment({
    commit
  }, {
    bookId,
    chapterIndex,
    content
  }) {
    await this.$axios.post(process.env.baseUrl + '/comments/add', {
      bookId,
      chapterIndex,
      content
    })
  }
}
