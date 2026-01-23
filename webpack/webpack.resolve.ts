import path from 'path';
import webpack from 'webpack';

export const getWebpackResolve = (): webpack.ResolveOptions => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(process.cwd(), './src'), 'node_modules'],
    alias: {
      '@modules': path.resolve(process.cwd(), './src/modules'),
      '@constants': path.resolve(process.cwd(), './src/shared/constants'),
      '@components': path.resolve(process.cwd(), './src/shared/components'),
      '@theme': path.resolve(process.cwd(), './src/shared/theme'),
      '@app': path.resolve(process.cwd(), './src/App'),
      '@useAppDispatch': path.resolve(process.cwd(), './src/App/useAppDispatch'),
      '@selectors': path.resolve(process.cwd(), './src/shared/selectors'),
    },
  };
};
