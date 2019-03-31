const pkg = require('./package')
const webpack = require('webpack')
require('dotenv').config()

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
        content: 'width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=1'
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

    }, {
      rel: 'stylesheet',
      href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#af9bd0',
    height: '3px',
    continuous: true
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    "assets/css/index.css",
    "assets/css/main.scss",
    'vue-loaders/dist/vue-loaders.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/intercept',
    {
      src: '~plugins/vue-star-rating',
      ssr: false
    },
    {
      src: '~/plugins/swiper',
      ssr: false
    },
    // {
    //   ssr: false,
    //   src: '~plugins/auth'
    // }, 
    {
      ssr: false,
      src: "~plugins/clickOutside"
    }, {
      ssr: false,
      src: "~plugins/vueEditor"
    }, {
      src: '@/plugins/vee-validate',
      ssr: false
    }, {
      src: '@/plugins/zondiIcon',
      ssr: false
    }, {
      src: '@/plugins/elementLoading',
      ssr: false
    }, {
      src: '@/plugins/vue-swipe-tab',
      ssr: false
    }, {
      src: '@/plugins/datePicker',
      ssr: false
    }, {
      src: '@/plugins/vuelineclamp',
      ssr: false
    }, {
      src: '@/plugins/bar',
      ssr: false
    }, {
      src: '@/plugins/graphs',
      ssr: false
    }, {
      src: '@/plugins/infinite',
      ssr: false
    }, {
      src: '@/plugins/lazy-load',
      ssr: false
    }, {
      src: '@/plugins/watchMedia',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    'nuxt-device-detect',
    'nuxt-webfontloader',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',

    ['@nuxtjs/moment', {
      locales: ['ja'],
      defaultLocale: 'ja'
    }],
    ['@nuxtjs/component-cache', {
      maxAge: 1000 * 60 * 60
    }],
    "@nuxtjs/auth",
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
      id: 'UA-119733183-2',
      autoTracking: {
        page: false
      }
    }]

  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: process.env.BASE_URL || 'http://0.0.0.0:5000/api'
  },

  auth: {
    strategies: {
      google: {
        client_id: '1011183696401-5qgvj0o68dk9fdfjr5lfrfe2rc61m6hh.apps.googleusercontent.com'
      },
      local: {
        _scheme: '~/auth/local.js',
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: false
          },
          user: {
            url: 'user/show',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/',
      home: '/'
    },
    plugins: ['~/plugins/auth.js']
  },
  router: {
    middleware: ['auth'],
    linkActiveClass: 'active-link'
  },
  webfontloader: {
    google: {
      families: ['IBM Plex Sans:300,400,700', 'Noto Sans JP:400,500', 'Sniglet:400,800'] //Loads Lato font with weights 400 and 700
    }
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
        grid: true,
        flexbox: true
      })
    ],
    plugins: [new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })]
  },
  transition: 'fade',
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
}
