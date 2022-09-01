module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/local-config/'
  ],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.js']
};
