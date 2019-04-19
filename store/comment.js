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
    // const nestedParent = filterParent(comments)
    state.comments = comments
  },
  USER_LIKED_COMMENTS(state, userId) {
    state.comments.forEach((comment) => {
      if (comment.ratedBy) {
        comment.ratedBy.forEach((rate) => {
          if (rate.userId === userId) {
            if (rate.type === 'like') {
              comment.liked = true
            } else {
              comment.disliked = true
            }
          }
        })
      }

    })
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments
  }

}

export const actions = {
  async getComments({
    commit,
    rootState
  }, {
    chapterId,
    userId = ""
  }) {
    await this.$axios.get(`/comment/show?chapterId=${chapterId}&userId=${userId}`).then(async (res) => {
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
    type
  }) {
    try {
      await this.$axios.patch('/comment/like', {
        id: commentId,
        type: type
      })
      commit('LIKED_COMMENTS', commentId)
    } catch (error) {

    }


  },
  async unLikeComment({
    commit
  }, {
    commentId,
    type
  }) {
    await this.$axios.patch('/comment/unlike', {
      id: commentId,
      type: type
    }).then((res) => {
      commit('UNLIKED_COMMENTS', commentId)
    }).catch((e) => {
      console.log(e);
    })
  },
}
