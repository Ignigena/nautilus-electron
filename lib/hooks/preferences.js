const Config = require('electron-config');

module.exports = function NautilusElectronPreferences(app) {
  app.preferences = new Config({
    defaults: app.config.preferences,
    name: app.config.self.name,
  });
};
