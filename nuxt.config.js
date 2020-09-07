require('dotenv').config()

const cockpitToken = process.env.COCKPIT_TOKEN
const googleCalendarApiKey = process.env.GOOGLE_CALENDAR_API_KEY

module.exports = {
  mode: 'universal',

  env: {
    cockpitToken,
    googleCalendarApiKey
  },

  meta: {
    name: 'FDF Nivå',
    description: 'Kom og leg med!'
  },

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600,900&display=swap' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#5F8CB4' },

  /*
   ** Global CSS
   */
  css: ['style/base.scss'],

  /*
   ** Style resources to inject into all components
   */
  styleResources: {
    scss: ['style/variables.scss']
  },

  server: {
    host: '0.0.0.0'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  buildModules: [
    '@nuxtjs/dotenv',
  ]
}
