import path from 'path';
import webpack from 'webpack';

export const getWebpackResolve = (): webpack.ResolveOptions => {
  const root = process.cwd();
  return {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(root, './src'), 'node_modules'],
    alias: {
      '@api': path.resolve(root, './src/shared/api'),
      '@modules': path.resolve(root, './src/modules'),
      '@constants': path.resolve(root, './src/shared/constants'),
      '@components': path.resolve(root, './src/shared/components'),
      '@theme': path.resolve(root, './src/shared/theme'),
      '@shared': path.resolve(root, './src/shared'),
      '@app': path.resolve(root, './src/App'),
      '@useAppDispatch': path.resolve(root, './src/App/useAppDispatch'),
      '@selectors': path.resolve(root, './src/shared/selectors'),
    },
  };
};
