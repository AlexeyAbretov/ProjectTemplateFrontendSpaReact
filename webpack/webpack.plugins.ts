import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { ENV } from './webpack.types';

export const getWebpackPlugins = (env: ENV): webpack.WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      template: env.NODE_ENV === 'production' ? './public/index.html' : './public/develop.html',
      env,
    }),
    new DefinePlugin({
      ...Object.entries(env).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: JSON.stringify(value),
        }),
        {},
      ),
    }),
    ...(env.NODE_ENV === 'development' && process.env.BUILD_MODE === 'build-dev'
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'report.html',
            openAnalyzer: false,
          }),
        ]
      : []),
  ];
};
