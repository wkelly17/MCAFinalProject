module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        mainGradient: '--gradient',
      }),
      fontFamily: {
        cursive: ['Dancing Script', 'cursive'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  shortcuts: {
    'flex-centerAll': 'flex items-center justify-center',
  },
  plugins: [],
};
