const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URI: process.env.API_URI
      }
    })
  ]
})
