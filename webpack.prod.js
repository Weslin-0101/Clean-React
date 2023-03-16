const { DefinePlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Commom = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(Commom, {
  mode: "production",
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
            loader: MiniCssExtractPlugin.loader,
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
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://fordevs.herokuapp.com/api"),
    }),
    new HtmlWebPackPlugin({
      template: "./template.prod.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main-bundle-[hash].css",
    }),
  ],
});