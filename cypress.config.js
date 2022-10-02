const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },
  env: {
    test1_username: 'test1',
    test1_password: 'testPa$$1',
    userPoolId: "us-east-1_EKiOVpdqH",
    clientId: "29idvltcrusbuv6les4qekpl94"
  },
});
