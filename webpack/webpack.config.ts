import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: 'development',
  devtool: "cheap-module-source-map",
  entry: './src/index.tsx',
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(process.cwd(), './src'), "node_modules",],
    alias: {
      "@modules": path.resolve(process.cwd(), './src/modules'),
      "@constants": path.resolve(process.cwd(), './src/shared/constants'),
      "@store": path.resolve(process.cwd(), "./src/store"),
      "@selectors": path.resolve(process.cwd(), "./src/shared/selectors")
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    client: {
      overlay: false,
    },
    server: {
      type: "https",
    },
    port: 9000,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};
