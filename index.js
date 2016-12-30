const Nautilus = require('nautilus/core');
const electron = require('electron');

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
    super(electron.app, config);

    this.loadHooks('core');
    this.loadHooks('custom');

    this.loadHooks('custom', 'channels');
  }
}

module.exports = NautilusDesktop;
