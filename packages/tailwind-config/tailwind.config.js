module.exports = {
  content: ["../../packages/components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand': '#4659a7',
        'danger': '#f24153'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'jost': ['Jost', 'Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
};
