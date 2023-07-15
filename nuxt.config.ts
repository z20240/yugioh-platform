// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vant/nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['vant/lib/index.css', '@/assets/scss/iconfont.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/styles.scss" as *;`,
        },
      },
    },
  },
  vant: {
    /** Options */
    lazyload: true,
    importStyle: true,
  },
  runtimeConfig: {
    // Will be available in both server and client
    public: {
      baseUrl: '',
      // will import from .env automatically
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
      },
    },
  },
});
