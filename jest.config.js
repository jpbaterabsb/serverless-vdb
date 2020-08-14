module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '/__tests__/(*.)(spec|test).(ts|tsx|js)',
    '**/?(*.)(spec|test).ts?(x)',
  ],
  moduleNameMapper: {
    '^@controllers(.*)$': '<rootDir>/src/controllers$1',
    '^@errors(.*)$': '<rootDir>/src/errors$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@lib(.*)$': '<rootDir>/src/lib$1',
    '^App(.*)$': '<rootDir>/src$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@translations(.*)$': '<rootDir>/src/translations$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@validators(.*)$': '<rootDir>/src/validators$1',
    '^@middlewares(.*)$': '<rootDir>/src/middlewares$1',
  },
};
