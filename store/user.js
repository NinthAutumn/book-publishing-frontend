import {
  get
} from 'lodash-es'
export const state = () => ({
  books: [],
  fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif",
  theme: '',
  fontSize: 16,
  update_view: 'grid',
  bookmarkInbox: [],
  user: {},
  reviews: [],
  comments: [],
  notification: [],
  author: {},
  username: false,
  profile: {},
  stats: {},
  commentNotification: [],
  commentNotificationCount: 0
})

export const getters = {
  getTheme: (state) => {
    return state.theme
  },
  getFontFamily: (state) => {
    return state.fontFamily
  },
  getFontSize: (state) => {
    return state.fontSize
  },
  getProfile: (state) => {
    return state.profile
  },
  getProfileBooks: (state) => {
    return state.books
  },
  getUserComments: (state) => {
    return state.comments
  },
  getProfileReviews: (state) => {
    return state.reviews
  },
  getUpdateView: (state) => {
    return state.update_view
  },
  getNotification: state => state.notification,
  isAuthor: state => {
    if (state.author) {
      return false
    } else {
      return true
    }
  },
  userNameExists: state => state.username,
  getProfileStats: state => state.stats,
  getAuthor: state => state.author,
  getCommentNotification: state => state.commentNotification,
  getCommentNotificationCount: state => state.commentNotificationCount,
  getUser: state => state.user
}

export const mutations = {
  SET_USER_BOOKS(state, books) {
    state.books = books
  },
  SET_USER: (state, user) => {
    state.user = user
  },

  LOADING: (state) => {
    state.isLoading = true
  },
  LOADING_FIN: (state) => {
    state.isLoading = false
  },
  SET_FONT_FAMILY: (state, fontFamily) => {
    state.fontFamily = fontFamily
  },
  SET_FONT_SIZE: (state, fontSize) => {
    state.fontSize = fontSize
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  SET_UPDATE_VIEW: (state, update_view) => {
    state.update_view = update_view
  },
  GET_BOOKMARK_UPDATE: (state, update) => {
    state.bookmarkInbox = update
  },
  SET_PROFILE: (state, profile) => {
    state.profile = profile
  },
  SET_PROFILE_REVIEWS: (state, reviews) => {
    state.reviews = reviews
  },
  SET_USER_COMMENTS: (state, comments) => {
    state.comments = comments
  },
  SET_NOTIFICATION: (state, notification) => {
    state.notification = notification
  },
  PUSH_NOTIFICATION: (state, notifications) => {
    notifications.forEach((notification) => {
      state.notification.push(notification)
    })
  },
  SET_AUTHOR: async (state, author) => {
    state.author = author
  },
  SET_USERNAME_AVAILABILITY: async (state, username) => {
    state.username = username
  },
  SET_PROFILE_BOOKS: async (state, books) => {
    state.books = books
  },
  SET_PROFILE_STATS: async (state, stats) => {
    state.stats = stats
  },
  SET_COMMENT_NOTIFICATION: (state, notifications) => {
    state.commentNotification = notifications
  },
  PUSH_COMMENT_NOTIFICATION: (state, notifications) => {
    notifications.forEach((notification) => {
      state.commentNotification.push(notification)
    })
  },
  SET_COMMENT_NOTIFICATION_COUNT: (state, count) => {
    state.commentNotificationCount = count
  }
}
export const actions = {
  async fetchUser({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get('/user')
      commit('SET_USER', data)
    } catch (error) {
      console.log(error);
    }

  },
  async getBooks({
    commit
  }, query) {
    commit('LOADING')
    try {
      const res = await this.$axios.get('/user/books')
      commit('SET_USER_BOOKS', res.data)
    } catch (error) {
      if (error.status) {}
    }
  },
  async fetchUserSettings({
    commit
  }) {
    const {
      data
    } = await this.$axios.get('/v2/user/show/setting')
    commit('SET_FONT_FAMILY', data.chapter_font_family)
    commit('SET_FONT_SIZE', data.chapter_font_size)
    commit('SET_THEME', data.chapter_theme)
    commit('SET_UPDATE_VIEW', data.update_display)
  },
  async setSetting({
    commit
  }, {
    type,
    change
  }) {
    const res = await this.$axios.patch('/v2/user/setting', {
      type,
      change
    })
    commit('SET_FONT_FAMILY', res.data.chapter_font_family)
    commit('SET_FONT_SIZE', res.data.chapter_font_size)
    commit('SET_THEME', res.data.chapter_theme)
    commit('SET_UPDATE_VIEW', res.data.update_display)

  },
  async patchProfile({
    commit
  }, {
    profile
  }) {
    try {
      const res = await this.$axios.patch(`/v2/user/profile`, profile)
      commit('SET_PROFILE', get(res, 'data'))
    } catch (error) {

    }
  },
  async fetchUserWithUserId({
    commit
  }, {
    userId
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/${userId}/show`)
      commit('SET_USER', get(res, 'data'))
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchProfile({
    commit
  }, {
    userId
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/${userId}/profile`)
      commit('SET_PROFILE', get(res, 'data'))
      Promise.resolve(res)
    } catch (error) {
      Promise.reject(error)
    }
  },
  async fetchUserProfile({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/my/show/profile`)
      commit('SET_PROFILE', get(res, 'data'))
      Promise.resolve(res)
    } catch (error) {
      Promise.reject(error)
    }
  },
  async fetchProfileStats({
    commit
  }, {
    userId
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/${userId}/profile/stats`)
      commit('SET_PROFILE_STATS', get(res, 'data'))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchProfileReviews({
    commit
  }, {
    userId,
    authorId,
    page = 1
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/${userId}/profile/reviews?page=${page}`)
      commit('SET_PROFILE_REVIEWS', get(res, 'data'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchUserComments({
    commit
  }, {
    userId,
    page = 1
  }) {
    try {
      const res = await this.$axios.get(`/v2/comment/user/book/list?page=${page}`)
      commit('SET_USER_COMMENTS', get(res, 'data'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchProfileBooks({
    commit
  }, {
    userId
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/${userId}/profile/books`)
      commit('SET_PROFILE_BOOKS', get(res, 'data'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchNotifications({
    commit
  }, {
    page,
    limit,
    infinite = false
  }) {
    try {
      const res = await this.$axios.get(`/v2/notification/chapter?page=${page}&limit=${limit}`)
      if (infinite) {
        commit('PUSH_NOTIFICATION', get(res, 'data'))
        return Promise.resolve(get(res, 'data'))
      }
      commit('SET_NOTIFICATION', get(res, 'data'))
    } catch (error) {}
  },
  async fetchAuthor({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/author`)
      commit('SET_AUTHOR', get(res, 'data'))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postAuthor({
    commit,
    dispatch
  }, {
    author
  }) {
    try {
      const {
        data
      } = await this.$axios.post(`/v2/author`, author)
      if (data.error) {
        return Promise.resolve(data)
      }
      await dispatch('fetchAuthor')
      return Promise.resolve({
        error: null
      })
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async checkUsername({
    commit
  }, {
    username
  }) {
    try {
      const res = await this.$axios.get(`/v2/user/show/isUsername?username=${username}`, {
        progress: false,
      })
      commit('SET_USERNAME_AVAILABILITY', get(res, 'data.available'))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchCommentNotifications({
    commit
  }, {
    page,
    infinite = false
  }) {
    try {
      const res = await this.$axios.get(`/v2/notification/comment?page=${page}`)
      if (infinite) {
        commit('PUSH_COMMENT_NOTIFICATION', res.data)
      } else {
        commit('SET_COMMENT_NOTIFICATION', res.data)
      }

      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchCommentNotificationsCount({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/v2/notification/comment/count`)
      commit('SET_COMMENT_NOTIFICATION_COUNT', res.data.count)

    } catch (error) {
      return Promise.reject(error)
    }
  },
  async patchCommentNotificationRead({
    commit,
    dispatch
  }) {
    try {
      this.$axios.patch(`/v2/notification/comment/read`).then(() => {
        dispatch('fetchCommentNotificationsCount')
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async patchUser({
    commit
  }, {
    user
  }) {
    try {
      await this.$axios.patch('/v2/user', user)
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
