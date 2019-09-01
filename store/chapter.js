import {
  get
} from 'lodash-es'
export const state = () => ({
  chapters: [],
  chapter: {},
  chapterCover: "",
  bookTitle: "",
  loading: false,
  list: [],
  list_simple: [],
  volumeList: [],
  modal: '',
  navigation: {},
  latestIndex: 0,
  latestBooks: [],
  latestBooksSimple: [],
  unlist: [], //chapters that aren't published
  count: 0,

  // chapters
})

export const getters = {
  getChapterList: (state) => {
    return state.list
  },
  getDeleted: (state) => {
    return state.unlist.filter((chapter) => {
      return chapter.state === 'deleted'
    })
  },
  getDraft: (state) => {
    return state.unlist.filter((chapter) => {
      return chapter.state === 'draft'
    })
  },
  getNextChapter: (state) => {
    return state.navigation.next
  },
  getPrevChapter: (state) => {
    return state.navigation.prev
  },
  getVolumeList: (state) => {
    return state.volumeList
  },
  getNewIndex: (state) => {
    return state.latestIndex + 1
  },
  getChapterBookTitle: (state) => {
    return state.bookTitle
  },
  getChapterCount: state => state.count,
  getLatestBooks: state => state.latestBooks,
  getLatestBooksSimple: state => state.latestBooksSimple,
  getChapter: state => state.chapter,
  getModalState: state => state.modal,
  getNotPublished: state => state.unlist,
  getPublishedList: state => state.list,
  getSimpleList: state => state.list_simple
}

export const mutations = {
  SHOW(state, chapter) {
    state.chapter = chapter
    state.chapterCover = chapter.bookId.cover
  },
  SET_CHAPTER(state, chapter) {
    state.chapter = chapter
  },
  SET_CHAPTER_LIST: (state, list) => {
    state.list = list
  },
  SET_NOT_CHAPTER_LIST: (state, list) => {
    state.unlist = list
  },
  SET_NAVIGATION(state, {
    next,
    prev
  }) {
    state.navigation = {
      next,
      prev
    }
  },
  SET_BOOK_TITLE(state, bookTitle) {
    state.bookTitle = bookTitle
  },
  TOC(state, toc) {
    state.toc = toc
  },
  SET_MODAL(state, type) {
    state.modal = type
  },
  TOC_REVERSE(state) {
    state.list = state.list.reverse()
    state.list.forEach((volume) => {
      volume.chapters.reverse()
    })
  },
  SET_CHAPTER_COUNT(state, count) {
    state.count = count
  },
  SET_VOLUME_LIST(state, list) {
    state.volumeList = list
  },
  SET_LATEST_INDEX(state, index) {
    state.latestIndex = index
  },
  SET_LATEST_BOOKS(state, books) {
    state.latestBooks = books
  },
  LOAD_LATEST_BOOKS(state, books) {
    books.forEach((item) => {
      state.latestBooks.push(item)
    })
  },
  LOAD_LATEST_BOOKS_SIMPLE(state, books) {
    state.latestBooksSimple = books
  },
  SET_CHAPTER_MOBILE(state, chapter) {
    state.chapters.push(chapter)
  },
  SET_SIMPLE_LIST: (state, list) => {
    state.list_simple = list
  }
}
export const actions = {
  async fetchMobileChapter({
    commit
  }, {
    chapterId,
    userId = "",
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter?chapterId=${chapterId}&userId=${userId}`)
      const {
        next,
        prev,
        chapter
      } = res.data
      commit('SET_CHAPTER_MOBILE', chapter)



      const {
        data
      } = await this.$axios.get(`/v1/chapter/count?bookId=${bookId}`)
      commit('SET_CHAPTER_COUNT', data.count)

    } catch (error) {
      return Promise.reject(error.response.message)
    }
  },
  async fetchChapter({
    commit,
    state
  }, {
    chapterId,
    bookId
  }) {
    // const nextindex = index
    try {
      const res = await this.$axios.get(`/v1/chapter?chapterId=${chapterId}`)
      const {
        next,
        prev,
        chapter
      } = res.data
      commit('SET_CHAPTER', chapter)


      const {
        data
      } = await this.$axios.get(`/v1/chapter/count?bookId=${bookId}`)
      commit('SET_CHAPTER_COUNT', data.count)

    } catch (error) {
      return Promise.reject(error.response.message)
    }
  },
  async fetchChapterDetail({
    commit
  }, {
    chapterId
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v1/chapter/show?chapterId=${chapterId}`)
      commit('SET_CHAPTER', data)

    } catch (error) {

    }
  },
  async fetchChapterNav({
    commit
  }, {
    bookId,
    index,
    settingIndex
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/nav?index=${index}&bookId=${bookId}&settingIndex=${settingIndex}`)
      const {
        next,
        prev,
      } = res.data
      commit('SET_NAVIGATION', {
        next,
        prev
      })
    } catch (error) {

    }

  },
  async fetchNotPublishedList({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/notpublished?bookId=${bookId}`)
      commit('SET_NOT_CHAPTER_LIST', res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async fetchPublishedList({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/published/list?bookId=${bookId}`)
      commit('SET_CHAPTER_LIST', res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async fetchVolumeList({
    commit
  }, bookId) {
    try {
      const res = await this.$axios.get(`/v1/chapter/volume/list?bookId=${bookId}`)
      commit('SET_VOLUME_LIST', res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async createChapter({
    commit
  }, {
    chapter,
    date
  }) {
    try {
      await this.$axios.post('/v1/chapter', {
        chapter,
        date
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchLatestIndex({
    commit
  }, {
    bookId,
    volumeId = ""
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/latestIndex?bookId=${bookId}&volumeId=${volumeId}`)
      const {
        index
      } = res.data
      commit('SET_LATEST_INDEX', index)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchLatestBooks({
    commit
  }, {
    limit = 10,
    page = 1
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/latestbooks?limit=${limit}&page=${page}`)
      commit('SET_LATEST_BOOKS', res.data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchMoreLatestBooks({
    commit
  }, {
    limit,
    page
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/latestbooks?limit=${limit}&page=${page}`)
      commit('LOAD_LATEST_BOOKS', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchUnstructuredList: async function ({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/unstructuredList?bookId=${bookId}`)
      commit('SET_SIMPLE_LIST', get(res, 'data'))
    } catch (error) {

    }
  },
  async fetchMoreLatestBooksSimple({
    commit
  }, {
    limit,
    page
  }) {
    try {
      const res = await this.$axios.get(`/v1/chapter/latestbooks/simple?limit=${limit}&page=${page}`)
      commit('LOAD_LATEST_BOOKS_SIMPLE', res.data)
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchChapterBookTitle({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v1/book/title?bookId=${bookId}`)

      commit('SET_BOOK_TITLE', res.data.title)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async postVolume({
    commit
  }, {
    volume
  }) {
    try {
      const res = await this.$axios.post(`/v1/chapter/volume`, volume)
      if (res.data.error) {
        return {
          error: res.data.error
        }
      } else {
        return res.data
      }
    } catch (error) {

    }

    (res);
    // if (res) {

    //   return Promise.reject(error)
    // }

  },
  async patchChapter({
    commit
  }, {
    chapterId,
    chapter
  }) {
    try {
      await this.$axios.patch('/v1/chapter', {
        chapter,
        chapterId
      })
    } catch (error) {

    }
  },
  async patchVolume({
    commit
  }, {
    title,
    id
  }) {
    await this.$axios.patch('/v1/chapter/volume', {
      title,
      id
    })
  }

}
