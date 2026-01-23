import dotenv from 'dotenv';
import path from 'path';
import { createDefaultPreset, pathsToModuleNameMapper } from 'ts-jest';

import tsconfig from './tsconfig.json' with { type: 'json' };

const compilerOptions = tsconfig.compilerOptions;
const tsJestTransformCfg = createDefaultPreset().transform;

const env = dotenv.config({ path: path.join(process.cwd(), '.env.jest') }).parsed || {};

export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/setupTests.ts'];
export const moduleNameMapper = {
  ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
};
export const transform = {
  ...tsJestTransformCfg,
};
export const globals = {
  ...env,
};
