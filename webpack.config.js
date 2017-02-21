const webpack = require("webpack");
const path    = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry:  ["babel-polyfill", "./src/app/main.js"],
  output: { path: __dirname, filename: "js-react-mrisk.min.js" },
  debug: !isProduction,
  devtool: isProduction ? "source-map" : "eval-source-map",
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        query: {
          plugins: ["transform-async-to-generator", "transform-class-properties"],
          presets: ["es2015", "react"]
        }
      },
      {
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    },
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/scss")]
  }
}
