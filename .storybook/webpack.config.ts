import path from 'path';
import webpack from 'webpack';

module.exports = ({ config }: { config: webpack.Configuration }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@components': path.resolve(process.cwd(), './src/shared/components'),
      },
    },
  };
};
