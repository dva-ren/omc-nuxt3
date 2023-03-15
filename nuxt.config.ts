import { loadEnv } from 'vite'
interface VITE_ENV_CONFIG {
  VITE_API_HOST: string
  VITE_PACK_ENV: string
  VITE_PACK_URL: string
}
const envScript = (process.env as any).npm_lifecycle_script.split(' ') || []
const envName = envScript[envScript.length - 1] // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG
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
    public: envData,
  },
})
