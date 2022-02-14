const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 9000,
    open: true
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif)$/i, use: "file-loader" },
      { test: /\.ts$/, use: "ts-loader" },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
