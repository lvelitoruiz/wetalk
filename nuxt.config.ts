// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
      clientId: process.env.CLIENTID,
      authority: process.env.AUTHORITY,
      redirectUri: process.env.REDIRECT_URI,
      postLogoutRedirectUri: process.env.POSTLOGOUT_REDIRECT_URI,
      stage: process.env.STAGE,
      varUTM: process.env.NUXT_URL_TM,
    }
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: "~/plugins/msal.ts", mode: "client" }],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    '@vueuse/nuxt',
    'nuxt-icons'
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  imports: {
    dirs: ['stores'],
  },
});
