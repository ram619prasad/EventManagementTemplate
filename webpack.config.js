const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: "[name].js",
      publicPath: '/'
    },
    resolve: {
      modules: [
        "node_modules",
        PATHS.app
      ],
      extensions: [".js", ".jsx", ".scss", ".html"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'templates/index.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'templates/index.html',
        template: 'templates/index.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'templates/events.html',
        template: 'templates/events.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'templates/menu.html',
        template: 'templates/menu.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'templates/rsvp.html',
        template: 'templates/rsvp.html',
      }),
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, "node_modules")
      ]),
      new ExtractTextPlugin({
        allChunks: true,
        filename: "[name].css",
      }),
      // new PurifyCSSPlugin({
      //   paths: glob.sync(path.join(__dirname, '*.html'))
      // }),
    ],
  },
  // parts.loadHTML(),
  parts.loadSCSS({ exclude: /node_modules/ }),
  parts.loadFonts({ exclude: /node_modules/ }),
  parts.loadImages({ exclude: /node_modules/ }),
  parts.loadJSON(),
  // parts.loadFontAwesome({
  //   options: {
  //     publicPath: '../', // Override any default path
  //     outputPath: 'fonts/',
  //     name: "[name].[ext]",
  //     exclude: /node_modules/
  //   },
  // }),
]);

const prodConfig = merge([]);
  
const devConfig = merge([
  parts.devServer({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080'
  })
]);

module.exports = (env) => {
  if (env === "production") {
    return merge(commonConfig, prodConfig);
  }
  return merge(commonConfig, devConfig);
};




