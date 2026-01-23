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
  };
};
