const { DefinePlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const commom = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commom, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: "./public",
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://fordevs.herokuapp.com/api"),
    }),
    new HtmlWebPackPlugin({
      template: "./template.dev.html",
    }),
  ],
});
