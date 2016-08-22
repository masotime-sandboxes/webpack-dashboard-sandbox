import { resolve } from 'path';
import webpack from 'webpack';

const { stringify, parse } = JSON;
const { env } = process;

// App files location
const PATHS = {
  app: resolve(__dirname, '../src/js'),
  build: resolve(__dirname, '../build'),
  contentBase: resolve(__dirname, '../src')
};

const FILES = {
  main: resolve(PATHS.app, 'main.js')
};

const PLUGINS = [
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': stringify('development'),
    __DEV__: stringify(parse(env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = {
  env : env.NODE_ENV,
  entry: {
    app: FILES.main,
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [/*'react-hot', */ 'babel'],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  plugins: PLUGINS,
  devServer: {
    contentBase: PATHS.contentBase,
    port: 3000,
    historyApiFallback: true
  },
  devtool: 'eval'
};