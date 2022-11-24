module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  moduleNameMapper: {
    '@exmpl/(.*)': '<rootDir>/src/$1',
  },
  verbose: true,
};
