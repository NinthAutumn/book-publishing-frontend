export const state = () => ({
  comments: []
})

export const getters = {
  getComments: state => state.comments
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
  SET_COMMENTS(state, comments) {
    state.comments = comments
  }
}

export const actions = {
  async fetchCommentList({
    commit,
    rootState
  }, {
    chapterId,
    userId = "",
    limit = 10,
    page = 1,
    type = 'likes',
    direction = 'desc'
  }) {
    await this.$axios.get(`/comment/chapter?type=${type}&direction=${direction}&page=${page}&limit=${limit}&chapterId=${chapterId}&userId=${userId}`).then(async (res) => {
      commit('SET_COMMENTS', res.data)
    })
  },
  async addComment({
    commit
  }, {
    bookId,
    chapterId,
    content,
    parent
  }) {
    await this.$axios.post('/comment/add', {
      bookId,
      chapterId,
      content,
      parent
    })
  },
  async addParentlessComment({
    commit
  }, {
    bookId,
    chapterId,
    content
  }) {
    await this.$axios.post('/comment/add', {
      bookId,
      chapterId,
      content
    })
  },
  async likeComment({
    commit
  }, {
    commentId,
    data
  }) {
    try {
      const res = await this.$axios.patch('/comment/vote', {
        commentId: commentId,
        data: data
      })
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  },
  fetchUserComments: async function ({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/comment/userBooks?bookId=${bookId}`)
      commit('SET_COMMENTS', res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
