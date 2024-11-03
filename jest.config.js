// jest.config.js
require('dotenv').config({ path: '.env.test' });

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // other Jest configurations
};
