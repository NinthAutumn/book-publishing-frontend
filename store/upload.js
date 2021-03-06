export const state = () => ({
  url: '',
  urls: []
})

export const getters = {
  getUrl: state => state.url,
  getMultipleFile: state => state.urls
}

export const mutations = {
  ADD_URL(state, url) {
    state.url = {
      url: `https://img.nobles.jp/${url}`,
      path: url
    }
  },
  PUSH_URL(state, url) {
    state.urls.push(`https://img.nobles.jp/${url}`)
  },
  REMOVE_URL(state, url) {
    state.url = ""
  },
  REMOVE_URLS(state) {
    state.urls = []
  }
}

export const actions = {
  async image({
    commit
  }, {
    file,
  }) {
    try {
      const uploadConfig = await this.$axios.get(`/v1/upload?filetype=${file}`)
      let auth = this.$axios.defaults.headers.common['Authorization']
      let trackId = this.$axios.defaults.headers.common['TrackId']
      delete this.$axios.defaults.headers.common['Authorization']
      delete this.$axios.defaults.headers.common['TrackId']
      await this.$axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': file.type,
        },
        baseURL: ""
      })
      commit('ADD_URL', uploadConfig.data.filename)
      this.$axios.defaults.headers.common['Authorization'] = auth
      this.$axios.defaults.headers.common['TrackId'] = trackId
      return Promise.resolve({
        url: `https://img.nobles.jp/${uploadConfig.data.filepath}`,
        path: uploadConfig.data.filepath,
        id: uploadConfig.data.id
      })
    } catch (error) {
      alert(error)
    }
  },
  async uploadCover({
    commit
  }, {
    file,
    size,
    unique
  }) {
    try {
      const {
        data
      } = await this.$axios.get(`/v2/upload/image/cover?size=${size}&unique=${unique}&filetype=${file.type}`)
      let auth = this.$axios.defaults.headers.common['Authorization']

      let trackId = this.$axios.defaults.headers.common['TrackId']
      delete this.$axios.defaults.headers.common['Authorization']
      delete this.$axios.defaults.headers.common['TrackId']
      const res = await this.$axios.put(data.url, file, {
        headers: {
          'Content-Type': file.type
        },
        baseURL: ""
      })
      this.$axios.defaults.headers.common['Authorization'] = auth
      this.$axios.defaults.headers.common['TrackId'] = trackId
      return Promise.resolve({
        url: data.image_url,
        path: data.filepath,
      })
    } catch (error) {
      alert(error)
    }
  },
  async uploadAvatar({
    commit
  }, file) {
    try {

      const {
        data
      } = await this.$axios.get(`/v2/upload/image?filetype=${file.type}`)
      let auth = this.$axios.defaults.headers.common['Authorization']
      let trackId = this.$axios.defaults.headers.common['TrackId']
      delete this.$axios.defaults.headers.common['Authorization']
      delete this.$axios.defaults.headers.common['TrackId']
      delete this.$axios.defaults.headers.common['Content-Type']

      await this.$axios.put(data.url, file, {
        headers: {
          'Content-Type': file.type,
        },
        baseURL: ""
      })
      this.$axios.defaults.headers.common['Authorization'] = auth
      this.$axios.defaults.headers.common['TrackId'] = trackId
      return Promise.resolve({
        url: data.image_url,
        path: data.filepath,
        id: data.drawing.id
      })
    } catch (error) {

    }
  },

}
