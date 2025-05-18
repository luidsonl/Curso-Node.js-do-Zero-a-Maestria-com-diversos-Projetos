/** @type {import('jest').Config} */
import { defaults } from 'jest-config';

const config = {
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  globalSetup: './test/globalSetup.mjs',
  globalTeardown: './test/globalTeardown.mjs',

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.spec\\.js$': '$1.spec.mjs',
    '^(\\.{1,2}/.*)\\.spec\\.mjs$': '$1.spec.mjs',
  },
  testMatch: ['**/*.spec.mjs'],
};

export default config;