const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    "assets/css/index.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~plugins/vue-star-rating',
      ssr: false
    },
    {
      src: '~/plugins/swiper',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt'

  ],
  /*
   ** Axios module configuration
   */
  axios: {

    // proxyHeaders: false

  },
  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'http://0.0.0.0:5000/users/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: 'http://0.0.0.0:5000/users/logout',
            method: 'post'
          },
          user: false
        },
        tokenRequired: true,
        tokenType: 'bearer',
        // decodeJWT: false,
        // tokenName: "x-auth"
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['vue-star-rating'],
    extend(config, ctx) {

    }
  }
}
