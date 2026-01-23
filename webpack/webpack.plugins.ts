import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { DefinePlugin } from 'webpack';

import { ENV } from './webpack.types';

export const getWebpackPlugins = (env: ENV): webpack.WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      template: env.NODE_ENV === 'production' ? './public/index.html' : './public/develop.html',
    }),
    new DefinePlugin({
      ...env,
    }),
  ];
};
