export default {
  isAuthenticated: state => state.loggedIn,
  getStrategy: state => state.strategy,
  getAccessToken: state => state.token,
  getRefreshToken: state => state.refresh_token,
  getUser: state => state.user,
  getPath: state => state.path,
  getUsernameModalState: state => state.usernameModal
}
