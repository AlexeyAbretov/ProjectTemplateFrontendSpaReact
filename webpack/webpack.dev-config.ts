import webpack from 'webpack';

import { getWebpackBaseConfig } from './webpack.base';
import { getWebpackDevServerConfig } from './webpack.devserver';
import { getEnvs } from './webpack.utils';

module.exports = (): webpack.Configuration => {
  const env = getEnvs('.env.development');

  return {
    ...getWebpackBaseConfig(env),
    devServer: getWebpackDevServerConfig(env),
  };
};
