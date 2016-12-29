const Nautilus = require('../index.js');
const TestApp = new Nautilus({
  window: {
    url: `file://${__dirname}/index.html`
  }
});

module.exports = TestApp.app;
