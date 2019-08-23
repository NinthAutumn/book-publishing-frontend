import {
  Avatar
} from 'element-ui';


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
      url: `https://storage.googleapis.com/theta-images/${url}`,
      path: url
    }
  },
  PUSH_URL(state, url) {
    state.urls.push(`https://storage.googleapis.com/theta-images/${url}`)
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
      const uploadConfig = await this.$axios.get(`/upload`)
      await this.$axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': 'image',
          "Authorization": null,
          "TrackId": null
        },
        baseURL: ""
      })
      commit('ADD_URL', uploadConfig.data.filename)
      return Promise.resolve({
        url: `https://storage.googleapis.com/theta-images/${uploadConfig.data.filepath}`,
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
      const uploadConfig = await this.$axios.get(`/upload/cover?size=${size}&unique=${unique}`)
      await this.$axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': 'image',
          "Authorization": null,
          "TrackId": null
        },
        baseURL: ""
      })
      commit('ADD_URL', uploadConfig.data.filename)
      return Promise.resolve({
        url: `https://storage.googleapis.com/theta-images/${uploadConfig.data.filepath}`,
        path: uploadConfig.data.filepath,
      })
    } catch (error) {
      alert(error)
    }
  },
  async uploadAvatar({
    commit
  }, file) {
    try {
      const uploadConfig = await this.$axios.get('/upload')
      await this.$axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': 'image',
          "Authorization": null,
          "TrackId": null
        },
        baseURL: ""
      })
      commit('ADD_URL', uploadConfig.data.filename)
      return Promise.resolve({
        url: `https://storage.googleapis.com/theta-images/${uploadConfig.data.filename}`,
        path: uploadConfig.data.filename,
        id: uploadConfig.data.id
      })
    } catch (error) {

    }
  },
  async multiImage({
    commit
  }, file) {
    try {
      const uploadConfig = await this.$axios.get('/upload')
      // delete this.$axios.defaults.headers.common["Authorization"]
      // delete this.$axios.defaults.headers.common["TrackId"]
      await this.$axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': 'image',
          "Authorization": null,
          "TrackId": null
        }
      })
      commit('PUSH_URL', uploadConfig.data.id)
      // const token = this.$storage.getUniversal('access_token')
      // let track_id = $storage.getUniversal('track_id')
      // this.$axios.defaults.headers.common['Authorization'] = token
      // this.$axios.defaults.headers.common["TrackId"] = track_id
      return Promise.resolve()

    } catch (error) {

    }



  }

}
