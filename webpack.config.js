const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "dist.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png,jpg,jpeg,gif,svg,webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack测试",
    }),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
  // webpack v5 开箱即带有最新版本的 terser-webpack-plugin
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩js代码,去除注释,和console.log()
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    static: "./dist",
    // 注意：在 webpack 5 中 HMR 已自动支持。无需配置
    // 启动时自动打开浏览器
    open: true,
  },
};
