import {
  get
} from 'lodash'
export const state = () => ({
  sitePlans: [],
  bookPlans: [],
  subscriptions: [],
  siteModal: false,
  sitePlan: {},
  subscription: {}
})

export const getters = {
  getSubscriptions: state => state.subscriptions,
  getSubscription: state => state.subscription,
  getSitePlans: state => state.sitePlans,
  getSiteModalState: state => state.siteModal,
  getSitePlan: state => state.sitePlan
}

export const mutations = {
  SET_SUBSCRIPTIONS: (state, subscriptions) => {
    state.subscriptions = subscriptions
  },
  SET_SUBSCRIPTION: (state, subscription) => {
    state.subscription = subscription
  },
  SET_SITE_PLANS: (state, plans) => {
    state.sitePlans = plans
  },
  SET_BOOK_PLANS: (state, plans) => {
    state.bookPlans = plans
  },
  TOGGLE_SITE_MODAL: (state) => {
    state.siteModal = !state.siteModal
  },
  SET_SITE_PLAN: (state, plan) => {
    state.sitePlan = plan
  }
}
export const actions = {
  fetchAllSubscriptions: async function ({
    commit
  }) {

  },
  fetchSitePlans: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/subscription/plan/site`)
      commit('SET_SITE_PLANS', get(res, 'data', {}))
    } catch (error) {

    }
  },
  fetchSubscription: async function ({
    commit
  }) {
    try {
      const res = await this.$axios.get(`/subscription`)
      commit('SET_SUBSCRIPTION', get(res, 'data', {}))
    } catch (error) {

    }
  },
  setSubscription: async function ({
    commit
  }, {
    subscription,
    planId
  }) {
    try {
      const subscriptions = await this.$axios.post(`/subscription/`, {
        planId,
        subscription
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
