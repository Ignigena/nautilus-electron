const _ = require('lodash');
const { BrowserWindow } = require('electron');

module.exports = function NautilusElectronWindow(app) {
  app.window = {};
  app.window.show = function createMainWindow() {
    app.window.main = new BrowserWindow(_.merge({
      backgroundColor: '#191A1B',
      width: 800,
      height: 600,
      titleBarStyle: 'hidden-inset',
      show: false,
    }, app.config.window));

    if (app.config.window && app.config.window.url) {
      app.window.main.loadURL(app.config.window.url);
    }

    // By waiting to show the window until it's "ready", we prevent flashes of
    // blank content when the application launches. This is especially important
    // when the window has a background color other than white.
    app.window.main.once('ready-to-show', () => app.window.main.show());

    // Emitted when the window is closed.
    app.window.main.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      app.window.main = null;
    });
  };

  app.on('ready', app.window.show);

  app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (app.window.main === null) {
      app.window.show();
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};
