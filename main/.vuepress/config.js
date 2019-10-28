const nav = require('./themeConfig/nav')
const sidebar = require('./themeConfig/sidebar')

module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/Documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Agoric Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Secure smart contracts', // desc for the site; rendered as a <meta> tag in the page HTML

  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
    /* --- NAVBAR (top) --- */
    nav,
    /* --- SIDEBAR --- */
    sidebar
    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Cusotmize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  }
}
