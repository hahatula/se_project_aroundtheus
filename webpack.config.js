const path = require("path");
// connect plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"],
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)
    open: true, // site will open automatically in the browser after executing npm run dev
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader"
        ]
      },
      {
        // add the rule for processing files
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource"
      },
    ],
  },
  stats: "errors-only",
  plugins: [ // use plugins
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

//если надо, создавать билды, то надо не забыть перенести индекс.хтмл в папку сорс и проверить пути
// In the src folder, create a directory called styles and inside it create a CSS file called index.css and add this CSS rule
// картинки и шрифты тоже в сорс
