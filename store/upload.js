import Cookies from 'js-cookie';


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
  }, file) {
    try {
      const uploadConfig = await this.$axios.get('/upload')
      await this.$axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': 'image',
          "Authorization": null,
          "TrackId": null
        }
      })
      commit('ADD_URL', uploadConfig.data.filename)
      return Promise.resolve({
        url: `https://storage.googleapis.com/theta-images/${uploadConfig.data.filename}`,
        path: uploadConfig.data.filename
      })
    } catch (error) {

    }


    // this.$axios.put(uploadConfig.data.url, file, {
    //   headers: {
    //     'Content-Type': 'image',
    //     "Authorization": null,
    //     "TrackId": null
    //   }
    // }).then((res) => {
    //   console.log("in here yo");

    // })

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
      }).catch((bal) => {
        console.log(bal);
      })
      commit('PUSH_URL', uploadConfig.data.filename)
      // const token = this.$storage.getUniversal('access_token')
      // let track_id = $storage.getUniversal('track_id')
      // this.$axios.defaults.headers.common['Authorization'] = token
      // this.$axios.defaults.headers.common["TrackId"] = track_id
      return Promise.resolve()

    } catch (error) {

    }



  }

}
