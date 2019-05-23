import Cookies from 'js-cookie';
import uuid from 'uuid'
import {
  serialize,
  parse
} from 'cookie'
// var cookie = require('cookie');


export const state = () => ({
  counter: 0,
  menuState: "menu-active",
  dashboardMenuState: "dashboard-inactive",
  dropdownState: false,
  authStep: 0,
  loginForm: false,
  productModal: false,
  contractModal: false,
  contractStep: 0,
  settingModal: false,
  volumeModal: false
})


export const getters = {
  getMenuState(state) {
    return state.menuState
  },
  getDMenuState: state => state.dashboardMenuState,
  isAuthenticated: (state) => {
    return state.auth.loggedIn
  },
  loggedInUser: (state) => {
    return state.auth.user
  },
  getProductModalState: state => state.productModal,
  getContractModalState: state => state.contractModal,
  getContractStep: state => state.contractStep,
  getSettingModal: state => state.settingModal,
  getLoginFormState: state => state.loginForm,
  getAuthStep: state => state.authStep,
  getVolumeModalState: state => state.volumeModal
}


export const mutations = {
  SIGNUP_STATE(state) {
    state.authStep = 1;
  },
  TOGGLE_VOLUME(state) {
    state.volumeModal = !state.volumeModal
  },
  TOGGLE_PRODUCT_MODAL(state) {
    state.productModal = !state.productModal
  },
  SET_AUTH_PAGE(state, page) {
    state.authStep = page
  },
  SET_CONTRACT_STEP(state, step) {
    state.contractStep = step
  },
  START(state) {
    state.authStep = 0
  },
  LOGIN_STATE(state) {
    if (state.loginForm) {
      state.loginForm = false
    } else {
      state.loginForm = true
      state.authStep = 0;
    }
  },
  LOGIN_FALSE(state) {
    state.loginForm = false
  },
  increment(state) {
    state.counter++
  },
  menuStateChange(state) {
    if (state.menuState != "menu-active") {
      state.menuState = "menu-active";
      state.slidesPerView = 7
    } else {
      state.menuState = "menu-inactive";
      state.slidesPerView = 9
    }
  },
  DROPDOWN_STATE(state) {
    state.dropdownState = !state.dropdownState
  },
  DROPDOWN_FALSE(state) {
    state.dropdownState = false
  },
  DASHBOARD_MENU_STATE_CHANGE(state) {
    if (state.dashboardMenuState === "dashboard-active") {
      state.dashboardMenuState = "dashboard-inactive"
    } else {
      state.dashboardMenuState = "dashboard-active"
    }

  },
  SET_CONTRACT_MODAL_STATE(state) {
    state.contractModal = !state.contractModal
  },
  TOGGLE_SETTING_MODAL(state) {
    state.settingModal = !state.settingModal
  }
}


export const actions = {

  async nuxtServerInit({
    commit,
    state,
    dispatch
  }, {
    req,
    res
  }) {


  }
}
