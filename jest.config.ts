import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    env: {TZ: 'UTC'},
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
