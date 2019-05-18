import Cookies from 'js-cookie';


export const state = () => ({
  url: '',
  urls: []
})

export const getters = {
  getUrl: state => state.url
}

export const mutations = {
  ADD_URL(state, url) {
    state.url = {
      url: `https://storage.googleapis.com/theta-images/${url}`,
      path: url
    }
  },
  PUSH_URL(state, url) {
    state.urls.push({
      url: `https://storage.googleapis.com/theta-images/${url}`,
      path: url
    })
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
    // delete this.$axios.defaults.headers.common['Authorization'];
    // delete this.$axios.defaults.headers.common['TrackId'];
    commit('REMOVE_URLS')
    const uploadConfig = await this.$axios.get('/upload')
    this.$axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': 'image',
        "Authorization": null,
        "TrackId": null
      }
    }).then(() => {
      commit('PUSH_URL', uploadConfig.data.filename)
    }).catch((e) => {
      console.log(e);
    })
    // const token = Cookies.get('token');
    // const uuid = Cookies.get('track_id');
    // this.$axios.defaults.headers.common['TrackId'] = uuid
    // this.$axios.defaults.headers.common['Authorization'] = token;

  }

}
