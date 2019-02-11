import Cookies from 'js-cookie';

export const state = () => ({
  url: ''
})

export const getters = {

}

export const mutations = {

}

export const actions = {
  async image({
    commit
  }, file) {
    console.log("this is gract");
    delete this.$axios.defaults.headers.common['Authorization'];

    const uploadConfig = await this.$axios.get(process.env.baseUrl + '/upload/cover')
    this.$axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type,
        "Authorization": null
      }
    })
    const token = Cookies.get('token');
    this.$axios.defaults.headers.common['Authorization'] = token;

  }

}
