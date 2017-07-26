require('babel/polyfill')

// Webpack config for creating the production bundle.
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var strip = require('strip-loader')
var AssetsPlugin = require('assets-webpack-plugin')

var relativeAssetsPath = '../public/dist'
var assetsPath = path.join(__dirname, relativeAssetsPath)

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      './client/app.js',
      'bootstrap-sass!./client/theme/bootstrap.config.prod.js',
      'font-awesome-webpack!./client/theme/font-awesome.config.prod.js'
    ],
    admin: [
      './client/admin.js',
      'bootstrap-sass!./client/theme/bootstrap.config.prod.js',
      'font-awesome-webpack!./client/theme/font-awesome.config.prod.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/public/dist/'
  },
  module: {
    loaders: [
      { test: /backbone\.js$/, loader: 'imports?define=>false' }, // turn off AMD when loading backbone

      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel'] },
      { test: /\.json$/, loader: 'json-loader' },

      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!less') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass') },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!stylus') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version') },

      // { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
      // { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass' },
      // { test: /\.styl$/, loader: 'style!css!autoprefixer?browsers=last 2 version!stylus' },
      // { test: /\.css$/, loader: 'style!css!autoprefixer?browsers=last 2 version' },
      { test: /\.(png|jpg|gif|wav|mp3)$/, loader: 'file' },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ],
    noParse: /node_modules\/quill\/dist\/quill\.js/
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new AssetsPlugin({prettyPrint: true}),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

    // set global vars
    new webpack.DefinePlugin({
      __DEBUG__: false,
      'process.env': {
        CLIENT: true,
        SERVER: false,
        NODE_ENV: JSON.stringify('production') // This has a big effect on the react lib size
      }
    }),

    // ignore jquery (used by backbone)
    new webpack.IgnorePlugin(/^jquery$/),

    // optimizations
    new webpack.optimize.CommonsChunkPlugin('shared', 'shared-[chunkhash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: false,
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]
}
