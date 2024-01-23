/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-100': 'var(--primary-100)',
        'primary-700': 'var(--primary-700)',
        'primary-900': 'var(--primary-900)',
        'secondary-100': 'var(--secondary-100)',
        'secondary-400': 'var(--secondary-400)',
        secondary: 'var(--secondary)',
        'secondary-700': 'var(--secondary-700)',
        'secondary-600': 'var(--secondary-600)',
        'tertiary-100': 'var(--tertiary-100)',
        'tertiary-600': 'var(--tertiary-600)',
        'tertiary-700': 'var(--tertiary-700)',
        'base-color': 'var(--base-color)',
        'neutral-1': 'var(--neutral-1)',
        'neutral-2': 'var(--neutral-2)',
        'neutral-3': 'var(--neutral-3)',
        'neutral-4': 'var(--gray-700)',
        'dark-600': 'var(--dark-600)',
      },
      fontFamily: {
        solano: ['solano'],
        publicSans: ['Public Sans'],
        'zizou-bold': ['zizou-bold'],
        'zizou-regular': ['zizou-regular'],
      },
      spacing: {
        'full-2': 'calc(100% - 2px)',
        'full-4px': 'calc(100% - 4px)',
        'res-html': 'calc(100vw - 24px)',
        'hor-mobile': 'calc(100vw - 3rem)',
        'full-minus-100': 'calc(100vh - 100px)',
        'full-3': 'calc(100vw - 1.5rem)',
        'weekly-calendar': 'calc(100vh - 25rem)',
        'daily-calendar': 'calc(100vh - 25rem)',
        'main-content-courses': 'calc(100vh - 180px)',
      },
      minHeight: {
        aside: 'calc(100vh - 62px)',
      },
      maxHeight: {
        'full-notification': 'calc(100vh - 80px)',
      },
      minWidth: {
        'full-main': 'calc(100% + 5rem)',
      },
      gridTemplateColumns: {
        weekly: 'repeat(7, minmax(73px, 1fr))',
      },
    },
  },
  plugins: [],
};
