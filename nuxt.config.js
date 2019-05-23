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
    }],
    script: [{
      src: '/js/fb-sdk.js'
    }, {
      src: '/js/gg-sdk.js'
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
    {
      src: '~/plugins/intercept',
      ssr: false
    },
    {
      ssr: false,
      src: '~/plugins/avatar'
    },
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
      src: '@/plugins/graphs',
      ssr: false
    }, {
      src: '@/plugins/infinite',
      ssr: false
    }, {
      src: '@/plugins/vueClamp',
      ssr: false
    }, {
      src: '@/plugins/watchMedia',
      ssr: false
    }, {
      src: '@/plugins/scrollama',
      ssr: false
    }, {
      src: '@/plugins/countTo',
      ssr: false
    }, {
      src: '@/plugins/chartLine',
      ssr: false
    }, {
      src: '@/plugins/scrollTo',
      ssr: false
    }, {
      src: '@/plugins/gAuth',
      ssr: false,
    },
    {
      src: '@/plugins/auth',
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
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',

    ['nuxt-validate', {
      lang: 'ja',
    }],
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '/',
      UserAgent: 'Googlebot',
      Disallow: '',
      UserAgent: 'Yahoo-slurp',
      Disallow: '',
      UserAgent: 'Msnbot',
      Disallow: ''
    }],
    ['@nuxtjs/moment', {
      locales: ['ja'],
      defaultLocale: 'ja'
    }],
    ['@nuxtjs/component-cache', {
      maxAge: 1000 * 60 * 60
    }],
    'cookie-universal-nuxt',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [{
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }, {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }]
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-119733183-2',
      autoTracking: {
        page: false
      }
    }],
    ['nuxt-universal-storage', {
      storage: {
        vuex: true, // boolean or {namespace} 
        localStorage: true, // boolean or {prefix } 
        cookie: true, // boolean or {prefix, options } 
        initialState: {}, // Object {}
        ignoreExceptions: true // 
      }
    }],
    ['@nuxtjs/dotenv', {
      /* module options */
    }],
    ['@nuxtjs/toast', {
      position: 'top-right',
      duration: 5000
    }],
    ['nuxt-stripe-module', {
      publishableKey: process.env.STRIPE_KEY,
      version: 'v3', // Default
    }],
    "nuxt-compress",
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: process.env.SERVER_URL || 'http://localhost:5000/api',
  },

  auth: {
    strategies: {
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        user: false,
        redirect_uri: 'http://127.0.0.1:3000/'
      },
      facebook: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        userinfo_endpoint: false,
        scope: ['public_profile', 'email'],
        redirect_uri: 'https://tolocalhost.com/'
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
  'manifest': {
    name: 'ノーブル　小説',
    short_name: 'ノーブル',
    lang: 'ja'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    },
    splitChunks: {
      layouts: true
    },
    styleResources: {
      sass: ['./assets/css/abstracts/main.scss']
    },
    transpile: ['vue-clamp', 'resize-detector'],
    postcss: {
      plugins: [
        require('postcss-gap-properties')(),
        require('autoprefixer')({
          grid: true,
          flexbox: true,
          stats: {
            warnings: false
          }
        })
      ]

    },
    plugins: [new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })]
  },
  server: {
    port: process.env.CLIENT_PORT || 3000, // default: 3000
    host: process.env.API_HOST || '0.0.0.0', // default: localhost
  },
}
