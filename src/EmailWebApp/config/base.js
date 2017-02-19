const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const publicPath = '/';
const entry = './src/app.jsx';
const extractSass = new ExtractTextPlugin({
  filename: 'app.css',
  disable: process.env.NODE_ENV === 'development',
});


module.exports = function (isDebug) {
  return {
    entry,
    output: {
      path: path.join(__dirname, '/../wwwroot/'),
      filename: 'app.js',
      publicPath,
      sourceMapFilename: '.map',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          include: [path.resolve(__dirname, '../src')],
          query: {
            cacheDirectory: isDebug,
            babelrc: false,
            presets: [
              ['es2015', { modules: false }],
              'stage-0',
              'react',
              ...(isDebug ? [] : ['react-optimize']),
            ],
            plugins: [
              'transform-runtime',
              ...(!isDebug
                ? []
                : [
                  'transform-react-jsx-source',
                  'transform-react-jsx-self',
                ]),
            ],
          },
        },
        {
          test: /\.scss$/,
          loader: extractSass.extract({
            loader: [{
              loader: 'css-loader',
            }, {
              loader: 'sass-loader',
            }],
            // use style-loader in development
            fallbackLoader: 'style-loader',
          }),
        },
        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
          loader: 'file-loader',
          query: {
            name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          },
        },
      ],
    },
    plugins: [
      extractSass,
    ],
  };
};