module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex:
    '(command-handler|query-handler|controller|service|gateway).spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^apps/(.*)$': '<rootDir>/apps/$1',
    '^@app/common/(.*)$': '<rootDir>/libs/common/src/$1',
  },
};
