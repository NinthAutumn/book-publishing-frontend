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
    },
    {
      ssr: false,
      src: '~plugins/auth'
    }, {
      ssr: false,
      src: "~plugins/clickOutside"
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // "@nuxtjs/auth",
    'cookie-universal-nuxt'

  ],
  /*
   ** Axios module configuration
   */
  axios: {

    // proxyHeaders: false

  },
  // auth: {
  //   strategies: {
  //     'api.provider': {
  //       _scheme: 'api',
  //       authorization_endpoints: {
  //         login: {
  //           url: 'http://0.0.0.0:5000/users/login',
  //           method: 'post',
  //           propertyName: 'token'
  //         },
  //         logout: {
  //           url: 'http://0.0.0.0:5000/users/logout',
  //           method: 'post'
  //         },
  //         user: {
  //           url: 'http://0.0.0.0:5000/users/show',
  //           method: 'get',
  //           propertyName: "user"
  //         }
  //       },
  //       tokenRequired: true,
  //       tokenType: 'Bearer',
  //       // decodeJWT: false,
  //       // tokenName: "x-auth"
  //     }
  //   },
  // redirect: {
  //   login: '/auth/login',
  //   logout: '/',
  //   callback: '/auth/login',
  //   home: '/'
  // }
  // },
  router: {
    middleware: ['logged']
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
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:5000'
  }
}
