module.exports = {
  extends: ["../shared/configs/.eslintrc.js"],
  env: {
    browser: false,
    node: true,
    es6: true,
    jest: true,
  },
  rules: { "no-console": "off" },
}
