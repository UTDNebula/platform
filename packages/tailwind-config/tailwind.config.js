module.exports = {
  content: ["../../packages/components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        'brand': '#4659a7',
        'danger': '#f24153'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'jost': ['Jost', 'Roboto', 'sans-serif']
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
