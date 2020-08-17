/**
 * @type import('@nuxt/types').NuxtConfig
 */
const config = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//demo.productionready.io/main.css',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/global.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/request.ts', '~/plugins/filters.ts'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  router: {
    fallback: true,
    extendRoutes(routes, resolve) {
      /**
       * @type import('@nuxt/types/config/router').NuxtRouteConfig[]
       */
      const newRoutes = [
        {
          name: 'home',
          path: '/',
          component: resolve(__dirname, 'pages/home.vue'),
        },
        {
          name: 'login',
          path: '/login',
          component: resolve(__dirname, 'pages/login.vue'),
        },
        {
          name: 'register',
          path: '/register',
          component: resolve(__dirname, 'pages/login.vue'),
        },
        {
          name: 'settings',
          path: '/settings',
          component: resolve(__dirname, 'pages/settings.vue'),
        },
        {
          name: 'editor',
          path: '/editor/:slug?',
          component: resolve(__dirname, 'pages/editor.vue'),
        },
        {
          name: 'article',
          path: '/article/:slug',
          component: resolve(__dirname, 'pages/article.vue'),
        },
        {
          name: 'profile',
          path: '/profile/:username',
          component: resolve(__dirname, 'pages/profile.vue'),
        },
      ]

      routes.splice(0, routes.length, ...newRoutes)
    },
  },
}

export default config
