import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: false,
  displayName: true,
});

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(process.cwd(), './src'), 'node_modules'],
    alias: {
      '@modules': path.resolve(process.cwd(), './src/modules'),
      '@constants': path.resolve(process.cwd(), './src/shared/constants'),
      '@components': path.resolve(process.cwd(), './src/shared/components'),
      '@theme': path.resolve(process.cwd(), './src/shared/theme'),
      '@app': path.resolve(process.cwd(), './src/App'),
      '@useAppDispatch': path.resolve(process.cwd(), './src/App/useAppDispatch'),
      '@selectors': path.resolve(process.cwd(), './src/shared/selectors'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    client: {
      overlay: false,
    },
    server: {
      type: 'https',
    },
    port: 9000,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
