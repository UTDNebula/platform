module.exports = {
  content: ["../../packages/components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        'haiti': '#090b2c', // brand black
        'persimmon': '#ff5743', // brand accent, danger
        'royal': '#573dff', // brand secondary (dark)
        'cornflower': '#6266fa', // brand primary
        'periwinkle': '#c2c8ff', // brand secondary (light)
      },
      fontFamily: {
        'kallisto': ['var(--font-kallisto)', 'Roboto', 'sans-serif'],
        'inter': ['var(--font-inter)', 'Roboto', 'sans-serif']
      },
      height: {
        '13': '3.25rem'
      },
      margin: {
        '3px': '3px'
      }
    },
  },
  plugins: [],
};
