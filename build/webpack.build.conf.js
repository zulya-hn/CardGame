/* Build config:
  ========================================================================== */

// Source: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge')
// Base config
const baseWebpackConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  output: {
    publicPath: './',
  },
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
