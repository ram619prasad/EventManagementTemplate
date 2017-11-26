const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host = 'loalhost', port = '8080'} = {}) => ({
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
});

exports.loadSCSS = ({include, exclude} = {}) => {

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include, 
          exclude,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1 } },
              { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer') ] } },
              { loader: 'sass-loader' }
            ]
          }),
        },
      ],
    }
  }
};

exports.loadFonts = ({include, exclude} = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      ]
    }
  }
};

exports.loadImages = ({include, exclude} = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg|jpeg)$/,
          use: {
            loader: "file-loader",
            options: { name: "[path][name].[ext]" },
          },
        },
      ]
    }
  }
};

exports.loadJSON = () => {
  return {
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader',
        }
      ]
    }
  }
}

// exports.loadHTML = () => {
//   return {
//     module: {
//       rules: [
//         {
//           test: /\.html$/,
//           use: {
//             loader: "html-loader",
//           },
//         },
//       ]
//     }
//   }
// };

// exports.loadFontAwesome = ({ include, exclude, options } = {}) => ({
//   module: {
//     rules: [
//       {
//         // Capture eot, ttf, woff, and woff2
//         test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
//         include,
//         exclude,
//         use: {
//           loader: "url-loader",
//           options,
//         },
//       },
//     ],
//   },
// });