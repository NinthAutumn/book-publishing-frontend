import _ from 'lodash'
export const state = () => ({
  paymentMethods: [],
  paymentMethod: {},
  customer: {},
  paymentIntent: {},
  subscription: {}
})

export const getters = {
  getPaymentMethods: state => state.paymentMethods,
  getPaymentMethod: state => state.paymentMethod,
  getCustomer: state => state.customer,
  getPaymentIntent: state => state.paymentIntent,
  getSubscription: state => state.subscription
}

export const mutations = {
  SET_PAYMENT_METHODS: (state, methods) => {
    state.paymentMethods = methods
  },
  SET_CUSTOMER: (state, customer) => {
    state.customer = customer
  },
  SET_PAYMENT_INTENT: (state, intent) => {
    state.paymentIntent = intent
  },
  SET_PAYMENT_METHOD: (state, method) => {
    state.paymentMethod = method
  },
  SET_SUBSCRIPTION: (state, subscription) => {
    state.subscription = subscription
  }
}
export const actions = {
  fetchPaymentMethods: async function ({
    commit
  }, {
    customerId,
    type
  }) {
    try {
      const res = await this.$axios.get(`/stripe/paymentMethods?customerId=${customerId}&type=${type}`)
      commit('SET_PAYMENT_METHODS', _.get(res, 'data', []))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchCustomer: async function ({
    commit
  }, {
    customerId
  }) {
    try {
      const res = await this.$axios.get(`/stripe/customer?customerId=${customerId}`)
      commit('SET_CUSTOMER', _.get(res, 'data', {}))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  postPaymentIntent: async function ({
    commit
  }, {
    customerId = null,
    payment_method_id,
    amount,
    skuId
  }) {
    try {
      const res = await this.$axios.post('/stripe/paymentIntent', {
        customerId,
        payment_method_id,
        amount,
        skuId
      })
      commit('SET_PAYMENT_INTENT', _.get(res, 'data.intent', {}))

      if (res.data.error) {
        return Promise.resolve({
          error: res.data.error
        })
      }
      if (res.data.requires_action) {
        return Promise.resolve({
          requires_action: res.data.requires_action
        })
      }

      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject()
    }
  },
  postCustomer: async function ({
    commit
  }, {
    fullname,
    email,
    phone
  }) {
    try {
      const res = await this.$axios.post('/stripe/customer', {
        fullname,
        email,
        phone
      })
    } catch (error) {}
  },
  savePaymentMethod: async function ({
    commit
  }, {
    customerId,
    paymentMethodId
  }) {
    try {
      const res = await this.$axios.patch('/stripe/paymentMethod/save', {
        customerId,
        paymentMethodId
      })
    } catch (error) {

    }
  },
  setSubscription: async function ({
    commit
  }, {
    paymentMethod,
    stripePlanId,
    planId
  }) {
    try {
      const res = await this.$axios.post('/stripe/subscription', {
        paymentMethod,
        stripePlanId
      })

      commit('SET_PAYMENT_INTENT', _.get(res, 'data.payment.intent', {}))
      commit('SET_SUBSCRIPTION', _.get(res, 'data.subscription', {}))
      if (res.data.error) {
        return Promise.resolve({
          error: _.get(res, 'data.payment.error', null)
        })
      }
      if (res.data.requires_action) {
        return Promise.resolve({
          requires_action: _.get(res, 'data.payment.requires_action', null)
        })
      }
      return Promise.resolve(_.get(res, 'data.payment'))
    } catch (error) {
      return Promise.reject()
    }
  }
}
