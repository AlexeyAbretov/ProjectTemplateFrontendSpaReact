import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import webpack from 'webpack';

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: false,
  displayName: true,
});

export const getWebpackRules = (): webpack.RuleSetRule[] => {
  return [
    {
      test: /\.(tsx|ts|js)?$/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
      },
      exclude: /node_modules/,
    },
  ];
};
