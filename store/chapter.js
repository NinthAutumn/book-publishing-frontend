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
  chapter_list: {
    published: [],
    deleted: [],
    draft: [],
    scheduled: []
  }

  // chapters
})

export const getters = {
  getChapterList: (state) => {
    return state.chapter_list['published']
  },
  getDeleted: (state) => {
    return state.chapter_list['deleted']
  },
  getDraft: (state) => {
    return state.chapter_list['draft']
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
  getPublishedList: state => state.chapter_list['published'],
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
  TOC_REVERSE(state, status) {
    state.chapter_list['published'] = state.chapter_list['published'].reverse()
    state.chapter_list['published'].forEach((volume) => {
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
  },
  SET_BOOK_CHAPTER_LIST(state, list) {
    state.chapter_list[list.state] = list.chapters
  }
}
export const actions = {
  async fetchChapter({
    commit,
    state
  }, {
    chapterId,
    bookId
  }) {
    // const nextindex = index
    try {
      const res = await this.$axios.get(`/v2/chapter/${chapterId}`)
      const {
        chapter
      } = res.data
      commit('SET_CHAPTER', chapter)
      const {
        data
      } = await this.$axios.get(`/v2/chapter/${bookId}/count`)
      commit('SET_CHAPTER_COUNT', data.count)

    } catch (error) {
      console.log(error);
      return Promise.reject(error)
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
      } = await this.$axios.get(`/v2/chapter/${chapterId}/show`)
      commit('SET_CHAPTER', data)

    } catch (error) {

    }
  },
  async fetchChapterNav({
    commit
  }, {
    bookId,
    index,
    settingIndex = 0
  }) {
    try {
      const res = await this.$axios.get(`/v2/chapter/${bookId}/nav?index=${index}&setting_index=${settingIndex}`)
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
  async fetchChapterList({
    commit
  }, {
    bookId,
    state,
    structured = false
  }) {
    try {
      const res = await this.$axios.get(`/v2/chapter/${bookId}/list?state=${state}&structured=${structured}`)

      const list = {
        chapters: res.data,
        state
      }
      commit('SET_BOOK_CHAPTER_LIST', list)
    } catch (error) {
      console.log(error);
    }
  },
  async fetchNotPublishedList({
    commit
  }, {
    bookId
  }) {
    try {
      const res = await this.$axios.get(`/v2/chapter/${bookId}/list?structured=false&state=draft`)
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
      const res = await this.$axios.get(`/v2/chapter/${bookId}/list?structured=true&state=published`)
      commit('SET_CHAPTER_LIST', res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async fetchVolumeList({
    commit
  }, bookId) {
    try {
      const res = await this.$axios.get(`/v2/chapter/volume/${bookId}`)
      // console.log(res.data);
      commit('SET_VOLUME_LIST', res.data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async createChapter({
    commit
  }, {
    chapter,

  }) {
    try {
      await this.$axios.post('/v2/chapter',
        chapter
      )
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchLatestIndex({
    commit
  }, {
    bookId,
    volumeId = null
  }) {
    try {
      const res = await this.$axios.get(`/v2/chapter/${bookId}/index${volumeId? `?volume_id=${volumeId}`:''}`)
      const {
        index
      } = res.data
      commit('SET_LATEST_INDEX', index)
      return Promise.resolve()
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
      const res = await this.$axios.get(`/v2/book/${bookId}/title`)

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
      const res = await this.$axios.post(`/v2/chapter/volume`, volume)
      if (res.error) {
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
      await this.$axios.patch(`/v2/chapter/${chapterId}`, chapter)
    } catch (error) {

    }
  },
  async patchVolume({
    commit
  }, {
    title,
    id
  }) {
    await this.$axios.patch(`/v2/chapter/volume/${id}/title`, {
      title
    })
  }

}
