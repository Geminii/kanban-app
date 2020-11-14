module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+.ts$': 'ts-jest',
    '^.+.js$': 'babel-jest',
    '.*.(vue)$': 'vue-jest',
  },
  testMatch: ['**/test/unit/**/*.spec.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/*.vue',
  ],
}
