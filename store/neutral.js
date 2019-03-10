export const state = () => ({
  openImage: false,
  imageUrl: ""
})

export const getters = {

}

export const mutations = {
  IMAGE_OPEN(state) {
    state.openImage = true
  },
  IMAGE_CLOSE(state) {
    state.openImage = false
  },
  SET_IMAGE(state, url) {
    state.imageUrl = url
  }
}
export const actions = {

}
