export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/tests/**/*.test.(ts|js)']
  };
  