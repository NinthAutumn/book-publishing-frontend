export const state = () => ({
  comments: []
})

export const getters = {
  getComments: state => state.comments
}

const findParent = ({
  comments,
  id,
  object
}) => {
  comments.forEach((comment) => {
    if (comment.id === id) {
      return comment['children'].unshift(object)
    } else if (comment['children']) {
      return findParent({
        comments: comment['children'],
        id,
        object
      })
    }
  })
};


const filterParent = function (items, id = undefined) {
  return items.filter((item) => {
    return item.parent === id
  }).map((filteredItem) => ({
    ...filteredItem,
    children: filterParent(items, filteredItem.id)
  }))
}


export const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },
  PUSH_COMMENT(state, comment, parentId) {
    // console.log(comment.parentId);
    try {
      const object = findParent({
        comments: state.comments,
        id: comment.parent_id,
        object: comment
      });

    } catch (error) {
      console.log(error);
    }
    // chcomment.children.push(comment)


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
    parentId = null
  }) {
    try {
      const res = await this.$axios.post('/comment', {
        bookId,
        chapterId,
        content,
        parentId
      })
      // console.log();
      // let comment = {}
      commit('PUSH_COMMENT', res.data, parentId)
    } catch (error) {

    }

  },
  async addParentlessComment({
    commit
  }, {
    bookId,
    chapterId,
    content
  }) {
    await this.$axios.post('/comment', {
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
  },
  patchComment: async function ({
    commit
  }, {
    comment
  }) {
    try {
      const res = await this.$axios.patch(`/comment`, comment)
    } catch (error) {

    }
  }
}
