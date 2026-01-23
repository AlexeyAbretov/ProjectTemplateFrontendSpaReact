import dotenv from 'dotenv';
import path from 'path';

import { ENV } from './webpack.types';

export const getEnvs = (file: string = '.env'): ENV => {
  const env = dotenv.config({ path: path.join(process.cwd(), file) }).parsed || {};

  return env;
};
