import webpack from 'webpack';

import { getWebpackBaseConfig } from './webpack.base';
import { getEnvs } from './webpack.utils';

module.exports = (): webpack.Configuration => {
  const env = getEnvs('.env.production');

  return {
    ...getWebpackBaseConfig(env),
  };
};
