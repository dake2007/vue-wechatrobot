const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
      // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: 'https://echarts.apache.org/examples',
        // 允许跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
