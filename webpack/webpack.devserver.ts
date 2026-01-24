import path from 'path';
import WebpackDevServer from 'webpack-dev-server';

export const getWebpackDevServerConfig = (): WebpackDevServer.Configuration => {
  return {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: 'auto',
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
        context: ['/module1/api/'],
        target: 'http://localhost:9001',
        changeOrigin: true,
        cookieDomainRewrite: '0.0.0.0',
        secure: false,
        logLevel: 'debug',
      },
      {
        context: ['/module2'],
        target: 'http://localhost:9002',
        changeOrigin: true,
        cookieDomainRewrite: '0.0.0.0',
        secure: false,
        logLevel: 'debug',
      },
    ],
  };
};
