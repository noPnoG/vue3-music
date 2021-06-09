const registerRouter = require('./backend/router')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-music/'
    : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
              @import "@/assets/scss/variable.scss";
              @import "@/assets/scss/mixin.scss";
            `
      }
    }
  },
  devServer: {
    before (app) {
      registerRouter(app)
    }
  }
}
