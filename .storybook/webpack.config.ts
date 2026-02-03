import path from 'path';
import webpack from 'webpack';

module.exports = ({ config }: { config: webpack.Configuration }) => {
  const root = process.cwd();
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@components': path.resolve(root, './src/shared/components'),
        '@theme': path.resolve(root, './src/shared/theme'),
      },
    },
  };
};
