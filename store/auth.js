import Cookies from 'js-cookie';
import {
  userInfo
} from 'os';

export const state = () => ({
  userId: "",
  token: Cookies.get('token') || '',
  status: "",
  loggedIn: false,
  menus: [{
      title: "ホーム",
      icon: "el-icon-search",
      link: "/",
      meta: ""
    },
    {
      title: "検索",
      icon: "el-icon-search",
      link: "/search",
      meta: "search"
    },
    {
      title: "ランキング",
      icon: "el-icon-search",
      link: "/rankings",
      meta: "ranking"
    },
    {
      title: "ストアー",
      icon: "el-icon-search",
      link: "/store",
      meta: "store"
    },
    {
      title: "ライブラリー",
      icon: "el-icon-search",
      link: "auth/login",
      meta: "library"
    }
  ]
  // username: "admin1",
  // password: "admin1"
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
  AUTH_REQUEST(state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, token) {
    state.status = 'success'
    state.token = token
    state.loggedIn = true
    // console.log(userId, "dog")
    // state.userId = userId

  },
  AUTH_SUCCESS_USER(state, userId) {
    state.userId = userId
    state.menus[4].link = "/library/?id=" + state.userId
  },
  AUTH_ERROR(state) {
    state.status = 'error'
  },
  AUTH_LOGOUT(state) {
    state.loggedIn = false
    state.userId = ""
    state.token = ""
  }

}

export const actions = {
  async login({
    commit,
    state
  }, user) {
    console.log("dogs")
    commit("AUTH_REQUEST")
    await this.$axios.post('http://localhost:5000/users/login', {
      username: user.username,
      password: user.password
    }).then((res) => {
      console.log(res.headers.authorization);
      console.log(res.data.userId)
      const token = res.headers.authorization
      this.$axios.defaults.headers.common['Authorization'] = token
      Cookies.set("token", token)
      commit("AUTH_SUCCESS", {
        token: token
      });
      commit("AUTH_SUCCESS_USER", {
        userId: res.data.userId
      });

      console.log(state.token)
      console.log(state.userId)
    })

  },
  async logOut({
    commit
  }) {
    await this.$axios.delete('http://localhost:5000/users/logout').then((res) => {
      console.log(res.headers.authorization);
      Cookies.remove('token')
      delete this.$axios.defaults.headers.common['Authorization']
      commit("AUTH_LOGOUT");
    }).catch((e) => {
      console.log(e);
    })
  },
  async signUp({
    commit
  }, user) {
    await this.$axios.post('http://localhost:5000/users/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }).then((res) => {
      const token = res.headers.authorization
      commit("AUTH_SUCCESS", token);
      commit("AUTH_SUCCESS_USER", res.data.userId)
    })
  }
}
