module.exports = {
  content: ["../../packages/components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'brand-gradient': "url('/gradient.png')"
      },
      colors: {
        'haiti': '#090b2c', // brand black
        'persimmon': {
          50: '#ffe5de',
          100: '#ffcabd',
          200: '#ffb09d',
          300: '#ff947e',
          400: '#ff7760',
          500: '#ff5743', // brand accent, danger
          600: '#d14a39',
          700: '#a43d2e',
          800: '#793025',
          900: '#51231b',
        },
        'royal': '#573dff', // brand secondary (dark)
        'cornflower': { 
          50: '#eae4ff',
          100: '#d3caff', // ~periwinkle
          200: '#bcb0fe',
          300: '#a297fd',
          400: '#857efc',
          500: '#6266fa', // brand primary
          600: '#5455cc',
          700: '#45449f', // ~royal
          800: '#363475',
          900: '#28254d'
        }, 
        'periwinkle': '#c2c8ff', // brand secondary (light)
        'shade': '#101828' // drop shadow color from shipfaster ui
      },
      fontFamily: {
        'kallisto': ['var(--font-kallisto)', 'Roboto', 'sans-serif'],
        'inter': ['var(--font-inter)', 'Roboto', 'sans-serif']
      },
      width: {
        'wide': '32rem'
      }
    },
  },
  plugins: [],
};
