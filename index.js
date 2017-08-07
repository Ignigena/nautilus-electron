const Nautilus = require('@nautilus/core');
const electron = require('electron');
const path = require('path');
const stack = require('callsite');

/**
 * Nautilus Desktop provides the same convention over configuration pattern for
 * Electron-based applications. It attempts to provide a starting point with
 * user-expected defaults while allowing an open and extensible framework.
 */
class NautilusDesktop extends Nautilus {

  /**
   * When creating a new application, anything passed to the `config` object
   * will override all other configuration levels. This includes both
   * environment and local defaults. This is most useful when disabling built-in
   * hooks globally rather than needing a dedicated configuration file.
   * @param {Object} config Optional top level configuration.
   */
  constructor(config) {
    electron.app.appPath = path.dirname(stack()[1].getFileName());
    super(electron.app, config);

    this.app.hooks.load('core');
    this.app.hooks.load('custom');

    this.app.hooks.load('custom', 'channels');

    this.loadPlugins();
  }

  /**
   * Plugins are loaded from the preferences directory. This changes based on
   * the operating system, but under macOS will be located at
   * `~/Library/Application Support/[app]/Plugins`. Plugins should be located
   * in their own directory with a `package.json` present for version info.
   * Currently plugins are executed with the entire application object which
   * means they have full permission and could be potentially destructive.
   */
  loadPlugins() {
    let plugins = path.dirname(this.app.preferences.path);
    plugins = path.resolve(plugins, 'Plugins');
    this.app.hooks.load('user', plugins);
  }
}

module.exports = NautilusDesktop;
