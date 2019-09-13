import {
  promised
} from "q";

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
    // (comment.parentId);
    try {
      const object = findParent({
        comments: state.comments,
        id: comment.parent_id,
        object: comment
      });
      console.log(object);
    } catch (error) {
      console.log(error);
    }
    // chcomment.children.push(comment)
  },
  PUSH_COMMENT_LIST(state, comments) {
    comments.forEach((comment) => {
      state.comments.push(comment)
    })
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
    direction = 'desc',
    sortBy = 0,
    infinite = false
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/comment/chapter?sortBy=${sortBy}&page=${page}&limit=${limit}&chapter_id=${chapterId}`)
      if (infinite) {
        commit('PUSH_COMMENTS_LIST', data)

      } else {
        commit('SET_COMMENTS', data)

      }
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }

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
      const {
        data
      } = await this.$axios.post('/v2/comment', {
        book_id: bookId,
        chapter_id: chapterId,
        content,
        parent_id: parentId
      })
      if (data.error) {
        return Promise.resolve(data)
      }
      // let comment = {}
      commit('PUSH_COMMENT', data, parentId)
      return Promise.resolve({
        error: null
      })
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }

  },
  async addParentlessComment({
    commit
  }, {
    bookId,
    chapterId,
    content
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/v2/comment', {
        book_id: bookId,
        chapter_id: chapterId,
        content
      })
      if (data.error) {
        return Promise.resolve(data)
      }
      return Promise.resolve({
        error: null
      })
    } catch (error) {
      return Promise.reject({
        error: error
      })
    }

  },
  async likeComment({
    commit
  }, {
    commentId,
    data
  }) {
    try {
      const res = await this.$axios.patch(`/v2/comment/${commentId}/vote`, {
        vote: data
      })
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  },
  fetchMobileComments: async function ({
    commit
  }, {
    chapterId,
    page = 1,
    sortBy = 0,
    infinite = false
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/comment/chapter?mobile=true&chapter_id=${chapterId}&page=${page}&sortBy=${sortBy}&limit=30`)
      if (infinite) {
        commit('PUSH_COMMENTS_LIST', data)
      } else {
        commit('SET_COMMENTS', data)
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.resolve()
    }

  },
  fetchUserComments: async function ({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v1/comment/userBooks?bookId=${bookId}`)
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
      const res = await this.$axios.patch(`/v2/comment/${comment.id}`, {
        content: comment.content
      })

    } catch (error) {

    }
  },
  addCommentMobile: async function ({
    commit
  }, {
    bookId,
    chapterId,
    content,
    parentId = null
  }) {

    const {
      data
    } = await this.$axios.post('/v2/comment', {
      book_id: bookId,
      chapter_id: chapterId,
      content,
      parent_id: parentId
    })
    if (data.error) {
      return Promise.resolve(data)
    }
    // commit('SHIFT_COMMENT')
  }
}
