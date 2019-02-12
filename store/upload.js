import Cookies from 'js-cookie';

export const state = () => ({
  url: ''
})

export const getters = {

}

export const mutations = {
  ADD_URL(state, url) {
    state.url = url
  }
}

export const actions = {
  async image({
    commit
  }, file) {
    console.log("this is gract");
    delete this.$axios.defaults.headers.common['Authorization'];

    const uploadConfig = await this.$axios.get(process.env.baseUrl + '/upload/cover?dataType=' + file.type)
    console.log(uploadConfig.data);
    await this.$axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type,
        "Authorization": null
      }
    }).then(() => {
      commit('ADD_URL', uploadConfig.data.filename)
    }).catch((e) => {
      console.log(e);
    })
    const token = Cookies.get('token');
    this.$axios.defaults.headers.common['Authorization'] = token;

  }

}
