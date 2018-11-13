const path = require('path');
const baseDirectory = __dirname;
const build = "build"
const buildPath = path.resolve(baseDirectory, './build');

const webpack = require("webpack");
const WriteFilePlugin = require('write-file-webpack-plugin');
const AureliaPlugin = require("aurelia-webpack-plugin").AureliaPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = ({ prod } = {}) => {
  const isDevBuild = !prod;
  const isProdBuild = prod;

  return {

    entry: { "main": "aurelia-bootstrapper" },
    target: "electron-renderer",
    output: {
      path: buildPath,
      filename: "[hash].js",
    },
    devtool: "inline-source-maps",
    devServer: {
      contentBase: 'build'
    },
    resolve: {                                 
      extensions: [".ts", ".js"],
      modules: ["src", "node_modules"],
    },
    module: {                                 
      rules: [
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader' // compiles Less to CSS
          }]
     },
     { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')},
        { test: /\.html$/i, use: ["html-loader"] },
        { test: /\.ts$/i, loaders: ['ts-loader'], exclude: path.resolve(__dirname, 'node_modules') },
        { test: /\.json$/i, loader: 'json-loader', exclude: path.resolve(__dirname, 'node_modules') },
        { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
        { test: /\.(png|gif|jpg)$/, loader: 'url-loader', query: { limit: 8192 } },
        { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2' } },
        { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
        { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      ]
    },
    plugins: [
      new AureliaPlugin({
        pal: "aurelia-pal-browser",
        dist: 'es2015',
        features: { ie: false, svg: false, unparser: false },

      }),
      new webpack.ProvidePlugin({
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
      }),
      new HtmlWebpackPlugin({
        title: 'Aurelia Electron',
        template: 'src/index.ejs',
        filename: "index.html"
      }),
      ...when(isDevBuild, new WriteFilePlugin()),
      ...when(isProdBuild, new BabiliPlugin())
    ]
  }
};

const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || []
const when = (condition, config, negativeConfig) => condition ? ensureArray(config) : ensureArray(negativeConfig)