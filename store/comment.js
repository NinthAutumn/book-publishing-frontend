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
    console.log(comments);
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
  COMMENT_STRUCTURE(state) {
    state.comments = filterParent(state.comments)
  }

}

export const actions = {
  async getComments({
    commit,
    rootState
  }, {
    chapterId
  }) {
    await this.$axios.get(process.env.baseUrl + '/comments/show?chapterId=' + chapterId).then(async (res) => {
      commit('GET_COMMENTS', res.data)
      if (rootState.auth.loggedIn) {
        commit('USER_LIKED_COMMENTS', rootState.auth.user._id)
      }
      commit('COMMENT_STRUCTURE')

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
    await this.$axios.post(process.env.baseUrl + '/comments/add', {
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
    await this.$axios.post(process.env.baseUrl + '/comments/add', {
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
      await this.$axios.patch(process.env.baseUrl + '/comments/like', {
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
    await this.$axios.patch(process.env.baseUrl + '/comments/unlike', {
      id: commentId,
      type: type
    }).then((res) => {
      commit('UNLIKED_COMMENTS', commentId)
    }).catch((e) => {
      console.log(e);
    })
  },
}
