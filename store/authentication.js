export const state = () => ({
  userId: "",
  // token: this.$cookies.get('user-token') || '',
  status: ""
})

export const getters = {
  isAuthenticated: (state) => {
    return !!state.token
  },
  authStatus: (state) => {
    return state.status
  }
}

export const mutations = {

}

export const actions = {
  authRequest: ({
    commit
  }) => {

  }
}
