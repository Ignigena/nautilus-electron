const EventEmitter = require('events');
const Config = require('electron-config');

module.exports = function NautilusElectronPreferences(app) {
  app.preferences = new Config({
    defaults: app.config.preferences,
    name: app.config.self.name,
  });

  // You can subscribe to changes in preferences using `app.preferences.observe`
  // This allows a hook to respond to changes after it has initialized. You can
  // use `on` or `once` depending on the needs of the hook. Don't forget to
  // clean up after yourself as event listeners will remain in memory.
  app.preferences.observe = new EventEmitter();

  // Currently the `preferences.set` method will emit changes to the observer.
  app.preferences._set = app.preferences.set;
  app.preferences.set = (key, value) => {
    if (value) {
      app.preferences.observe.emit(key, value);
    }
    app.preferences._set(key, value);
  };
};
