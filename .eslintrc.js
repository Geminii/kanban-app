module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  globals: {
    Vue: true,
    Cypress: true,
    cy: true,
  },
  rules: {},
}
