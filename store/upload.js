import Cookies from 'js-cookie';

export const state = () => ({
  url: '',
  urls: []
})

export const getters = {

}

export const mutations = {
  ADD_URL(state, url) {
    state.url = url
  },
  PUSH_URL(state, url) {
    state.urls.push(url)
  }
}

export const actions = {
  async image({
    commit
  }, file) {
    const uploadConfig = await this.$axios.get(process.env.baseUrl + '/upload/cover')
    delete this.$axios.defaults.headers.common['Authorization'];
    delete this.$axios.defaults.headers.common['TrackId'];
    console.log(uploadConfig.data);
    await this.$axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': 'image',
        "Authorization": null,
        "TrackId": null
      }
    }).then(() => {
      commit('ADD_URL', uploadConfig.data.filename)
    }).catch((e) => {
      console.log(e);
    })
    const token = Cookies.get('token');
    const uuid = Cookies.get('track_id');
    this.$axios.defaults.headers.common['TrackId'] = uuid
    this.$axios.defaults.headers.common['Authorization'] = token;

  },
  async multiImage({
    commit
  }, file) {
    console.log("this is gract");
    delete this.$axios.defaults.headers.common['Authorization'];
    delete this.$axios.defaults.headers.common['TrackId'];
    const uploadConfig = await this.$axios.get(process.env.baseUrl + '/upload/cover')
    console.log(uploadConfig.data);
    await this.$axios.put(uploadConfig.data.url, file, {
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
    const token = Cookies.get('token');
    const uuid = Cookies.get('track_id');
    this.$axios.defaults.headers.common['TrackId'] = uuid
    this.$axios.defaults.headers.common['Authorization'] = token;

  }

}
