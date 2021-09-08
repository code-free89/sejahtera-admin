// const colors = {
//   darkBlue: '#252f3f',
//   lightGray: '#f3f4f6',
//   whiteGray: '#b7bcc4',
// };

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#ECD278',
      'secondary': '#EDDE89',
      'danger': '#e3342f',
    }),
    extend: {
      minHeight: {
        '800': '800px',
      }
    },
  },
  variants: {
    container: [],
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
