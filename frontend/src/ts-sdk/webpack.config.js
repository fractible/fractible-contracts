
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  devServer: {
    liveReload: true,
    hot: true,
    host: "localhost",
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify")
    },
    alias: {
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/index.html', to:"./index.html" },
      ]
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    })
  ]
};
