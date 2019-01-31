const pkg = require('./package')
// var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const webpack = require('webpack');
// var webpackConfig = {
//   // ...
//   plugins: [
//     new FriendlyErrorsWebpackPlugin(),
//   ],
//   // ...
// }

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
    "assets/css/index.css",
    "assets/css/main.scss"

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
    }, {
      ssr: false,
      src: "~plugins/vueEditor"
    }, {
      src: '@/plugins/vee-validate',
      ssr: false
    }, {
      src: '@/plugins/v-selectpage',
      ssr: false
    }, {
      src: '@/plugins/v-input-tag',
      ssr: false
    }, {
      src: '@/plugins/zondiIcon',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [

    '@nuxtjs/pwa',

    'nuxt-device-detect',

    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['@nuxtjs/moment', {
      locales: ['ja'],
      defaultLocale: 'ja'
    }],
    // "@nuxtjs/auth",
    'cookie-universal-nuxt',
    'nuxt-svg-loader',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        }
      ]
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-119733183-2'
    }]

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
    middleware: ['logged'],
    linkActiveClass: 'active-link'
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

    },
    splitChunks: {
      layouts: true
    },
    styleResources: {
      scss: './assets/css/abstracts/main.scss',
      // sass: ...,
      // scss: ...
      options: {
        // See https://github.com/yenshih/style-resources-loader#options
        // Except `patterns` property
      }
    },
    postcss: [
      require('postcss-gap-properties')(),
      require('autoprefixer')({
        browsers: ['IE 11', 'last 2 versions'],
        grid: true
      })
    ],
    plugins: []
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://0.0.0.0:5000'
  },
  loading: {
    color: '#c9b1f5',
    height: '2px',
    continuous: true
  },
  layoutTransition: 'layout',
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
}
