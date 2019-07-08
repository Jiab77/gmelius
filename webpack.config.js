let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
let HtmlPlugin = require('html-webpack-plugin');
// let helpers = require('./node.helpers.js');
let path = require('path');
let webpack = require('webpack');
let environment = ['NODE_ENV'];
let isDev   = true;

const {VueLoaderPlugin} = require('vue-loader');

module.exports = {

    mode: 'development',

    entry: {
      polyfill: '@babel/polyfill',
      // main: helpers.root('src', 'main'),
      main: path.resolve(__dirname, './main.js'),
      // main: './main.js',
    },

    resolve: {
      extensions: [ '.js', '.vue' ],
      alias: {
        // 'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
        'vue$': isDev ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
        // '@': helpers.root('src')
        '@': path.resolve(__dirname, 'src')
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          // include: [ helpers.root('src') ]
          include: [ path.resolve(__dirname, 'src') ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          // include: [ helpers.root('src') ]
          include: [ path.resolve(__dirname, 'src') ]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDev } },
          ]
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'sass-loader', options: { sourceMap: isDev } }
          ]
        },
        {
          test: /\.sass$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'sass-loader', options: { sourceMap: isDev } }
          ]
        }
      ]
    },

    plugins: [

      new VueLoaderPlugin(),
          
      new HtmlPlugin({
        template: 'index.html',
        chunksSortMode: 'dependency'
      }),

      new webpack.EnvironmentPlugin(environment),
  
      new webpack.HotModuleReplacementPlugin(),
        
      new FriendlyErrorsPlugin()

    ],

    devtool: 'cheap-module-eval-source-map',

    output: {
      // path: helpers.root('dist'),
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[id].chunk.js'
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all'
      }
    },

    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
      overlay: true,
      port: 8000,
      stats: {
        normal: true
      }
    }

};