export default {
  SET_AUTH: (state, {
    access_token,
    refresh_token,
    strategy = "local"
  }) => {
    state.token = access_token
    state.refresh_token = refresh_token
    state.loggedIn = true
    state.strategy = strategy
  },
  AUTH_LOGOUT(state) {
    state.loggedIn = false
    state.token = ""
    state.refresh_token = ""
    state.strategy = ""
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_AUTH_PATH: (state, path) => {
    state.path = path
  },
  TOGGLE_USERNAME_MODAL(state) {
    state.usernameModal = !state.usernameModal
  }
}
