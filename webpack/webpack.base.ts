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
        chunks: 'all',
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/]react(-dom)?[\\/]/,
            name: 'react',
            priority: 11,
            enforce: true,
          },
          router: {
            test: /[\\/]node_modules[\\/]react-router(-dom)?[\\/]/,
            name: 'react-router',
            priority: 10,
            enforce: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 9,
            enforce: true,
          },
        },
      },
    },
  };
};
