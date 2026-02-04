import path from 'path';
import WebpackDevServer from 'webpack-dev-server';

import { ENV } from './webpack.types';

export const getWebpackDevServerConfig = (env: ENV): WebpackDevServer.Configuration => {
  return {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: env.PUBLIC_PATH,
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
    proxy: [
      {
        context: ['/api/'],
        target: 'http://localhost:9001',
        changeOrigin: true,
        cookieDomainRewrite: '0.0.0.0',
        secure: false,
        logLevel: 'debug',
      },
    ],
  };
};
