// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-particles'],
  particles: {
    mode: 'slim',
    lazy: false
  },
    app: {
    baseURL: '/JonathanPONT-git.github.io/', // <= /<nom-du-repo>/
  },
  nitro: { preset: 'github-pages' }, // génère 404.html et .nojekyll
}


