const envScript = process.env.npm_lifecycle_script?.split(' ') || []
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
    '~/assets/css/markdown.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    env: envScript[envScript.length - 1],
  },
})
