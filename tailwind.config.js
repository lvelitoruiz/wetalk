/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        solano: ['solano'],
        publicSans: ['Public Sans'],
        'zizou-bold': ['zizou-bold'],
        'zizou-regular': ['zizou-regular']
      }
    },
  },
  plugins: [],
}

