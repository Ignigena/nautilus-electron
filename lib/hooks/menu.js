const { Menu } = require('electron');

module.exports = function NautilusElectronMenu(app) {
  if (typeof app.config.menu === 'function') {
    app.config.menu = app.config.menu(app);
  }

  return {
    rebuild(menu) {
      app.menu.main = Menu.buildFromTemplate(menu || app.config.menu);
      Menu.setApplicationMenu(app.menu.main);
    },
  };
};
