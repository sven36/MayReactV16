const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    alias: {
      nervjs: path.join(
        __dirname,
        '..',
        '..',
        './packages',
        'nerv',
        'dist',
        'nerv.min.js'
      )
    },
    extensions: ['.js', '.jsx']
  },
  entry: {
    main: path.join(__dirname, 'app.js')
  },
  output: {
    path: path.join(__dirname),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['env', {
            'targets': {
              'browsers': ['last 2 versions', 'safari >= 7']
            }
          }], 'stage-0'],
          plugins: [
            [
              'transform-react-jsx',
              {
                pragma: 'createElement'
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
