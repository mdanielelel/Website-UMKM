import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      titleTemplate: '%s — Redian Grup',
      title: 'Redian Grup',
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: 'Redian Grup — Digital Creative Agency terbaik untuk menjadi solusi pertama dalam memajukan dunia digital di Indonesia yang berani untuk melakukan langkah yang lainnya tidak berani lakukan.' },
        { name: 'keywords', content: 'Website, Application, Digital Agency' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'googlebot', content: 'notranslate' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    },
  },
  css: [
    '~/assets/fonts.scss',
  ],
  build: {
    loaders: {
      scss: {
        implementation: require('sass')
      }
    },
  }
})
