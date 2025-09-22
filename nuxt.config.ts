export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-particles'],
  particles: { mode: 'slim', lazy: false },

  app: { baseURL: '/' },          // ✅ IMPORTANT
  nitro: { preset: 'github-pages' } // 404.html + .nojekyll
})