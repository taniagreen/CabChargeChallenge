const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function (env) {
  return webpackMerge(commonConfig(false), {
    devtool: 'inline-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  });
};