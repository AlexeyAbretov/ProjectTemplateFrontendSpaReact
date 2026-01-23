import path from 'path';
import webpack from 'webpack';

import { getWebpackPlugins } from './webpack.plugins';
import { getWebpackResolve } from './webpack.resolve';
import { getWebpackRules } from './webpack.rules';
import { ENV } from './webpack.types';

export const getWebpackBaseConfig = (env: ENV): webpack.Configuration => {
  return {
    mode: env.NODE_ENV || 'none',
    devtool: env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
    entry: './src/index.tsx',
    output: {
      path: path.join(process.cwd(), env.NODE_ENV === 'production' ? 'build' : 'build-dev'),
      filename: env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
      publicPath: 'auto',
      clean: true,
    },
    resolve: getWebpackResolve(),
    module: {
      rules: getWebpackRules(),
    },
    plugins: getWebpackPlugins(env),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};
