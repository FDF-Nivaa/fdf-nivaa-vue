require('dotenv').config()

const axios = require('axios')

const cockpitToken = process.env.COCKPIT_TOKEN
const googleCalendarApiKey = process.env.GOOGLE_CALENDAR_API_KEY

module.exports = {
  telemetry: false,

  target: 'static',

  env: {
    cockpitToken,
    googleCalendarApiKey,
  },

  meta: {
    name: 'FDF Nivå',
    description: 'Kom og leg med!',
  },

  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
    ],
    link: [
      { rel: 'preconnect', href: 'https://cockpit.fdfkarlebo.dk' },
      { rel: 'preconnect', href: 'https://storage.googleapis.com' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600,900&display=swap',
        onload:
          'console.log("font loaded"); this.removeAttribute("as"); this.removeAttribute("onload"); this.rel = "stylesheet"',
      },
    ],
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
    scss: ['style/variables.scss'],
  },

  server: {
    host: '0.0.0.0',
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
    '@nuxtjs/feed',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
  ],

  /*
   ** Feed
   */
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'FDF Nivå',
          link: 'https://fdfnivå.dk/feed.xml',
          description: 'De sidste nye opslag fra FDF Nivå',
        }

        const posts = await axios
          .get(
            `https://cockpit.fdfkarlebo.dk/api/collections/get/posts?token=${cockpitToken}`
          )
          .then((response) => response.data.entries)

        posts.sort((a, b) => b._created - a._created)

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post._id,
            link: `https://fdfnivå.dk/posts/${post._id}`,
            description: post.intro,
            content: `<p>${post.intro}</p>${post.content}`,
          })
        })
      },
      cacheTime: 1000 * 60 * 15, // 15 minutes
      type: 'rss2', // Can be: rss2, atom1, json1
    },
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
    extend(config, ctx) {}, // eslint-disable-line
  },

  buildModules: ['@nuxtjs/dotenv'],
}
