// vue.config.js
var path = require('path');

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  outputDir: path.resolve(__dirname, './dist/client'),
  filenameHashing: false,
  chainWebpack: config => {
    config.resolve.alias.set('Utils', path.resolve(__dirname, './client/utils'));
    config.resolve.alias.set('~', path.resolve(__dirname, './node_modules'));
    config.resolve.alias.set('Styles', path.resolve(__dirname, './client/scss'));
  },
  css: {
    sourceMap: true
  },
  configureWebpack: {
    entry: {
      app: './client/main.js'
    }
  }
};
