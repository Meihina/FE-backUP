const CopyPlugin = require('copy-webpack-plugin')
var path = require("path")

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CopyPlugin({
          patterns: [
              {
                  from: './node_modules/mavon-editor/dist/highlightjs', to: path.resolve(__dirname, './dist/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
              },
              {
                  from: './node_modules/mavon-editor/dist/markdown', to: path.resolve(__dirname, './dist/markdown'), // 插件将会把文件导出于/dist/markdown之下
              },
              {
                  from: './node_modules/mavon-editor/dist/katex', to: path.resolve(__dirname, './dist/katex')
              }
          ],
      }),
    ]
  }
}