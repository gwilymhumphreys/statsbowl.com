require('babel/polyfill')

// Webpack config for development
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var assetsPath = path.resolve(__dirname, '../public')
var host = (process.env.HOSTNAME || 'localhost')
var port = parseInt(process.env.PORT) + 1 || 4001

var AssetsPlugin = require('assets-webpack-plugin')

var babelrc = fs.readFileSync('./.babelrc')
var babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
}
catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}
var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment)
delete babelLoaderQuery.env

babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
if (babelLoaderQuery.plugins.indexOf('react-transform') < 0) {
  babelLoaderQuery.plugins.push('react-transform')
}

babelLoaderQuery.extra = babelLoaderQuery.extra || {}
if (!babelLoaderQuery.extra['react-transform']) {
  babelLoaderQuery.extra['react-transform'] = {}
}
if (!babelLoaderQuery.extra['react-transform'].transforms) {
  babelLoaderQuery.extra['react-transform'].transforms = []
}
babelLoaderQuery.extra['react-transform'].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
})

module.exports = {
  // devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      'bootstrap-sass!./client/theme/bootstrap.config.js',
      'font-awesome-webpack!./client/theme/font-awesome.config.js',
      './client/app.js',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr'
    ],
    admin: [
      'bootstrap-sass!./client/theme/bootstrap.config.js',
      'font-awesome-webpack!./client/theme/font-awesome.config.js',
      './client/admin.js',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    publicPath: 'http://' + host + ':' + port + '/public/'
  },
  module: {
    loaders: [
      { test: /backbone\.js$/, loader: 'imports?define=>false' }, // turn off AMD when loading backbone

      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)] },
      { test: /\.json$/, loader: 'json-loader' },

      { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass' },
      { test: /\.styl$/, loader: 'style!css!autoprefixer?browsers=last 2 version!stylus' },
      { test: /\.css$/, loader: 'style!css!autoprefixer?browsers=last 2 version' },
      { test: /\.(png|jpg|gif|wav|mp3)$/, loader: 'file' },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
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
    new webpack.optimize.CommonsChunkPlugin('shared', 'shared.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    // ignore jquery (used by backbone)
    new webpack.IgnorePlugin(/^jquery$/),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __DEBUG__: process.env.DEBUG || false,
      'process.env': {
        CLIENT: true,
        SERVER: false
      },
    })
  ],
  quiet: true,
  stats: 'none'
}
