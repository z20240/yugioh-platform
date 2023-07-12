// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vant/nuxt"],
  vant: {
    /** Options */
    lazyload: true,
  },
  runtimeConfig: {
    // Will be available in both server and client
    public: {
      baseUrl: "",
      // will import from .env automatically
      firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
      },
    },
  },
});
