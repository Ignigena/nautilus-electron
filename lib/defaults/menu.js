const { shell } = require('electron');

const { findIndex } = require('lodash');

let production = process.env.NODE_ENV === 'production';

module.exports = app => {
  const appMenu = [{
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  }];

  if (!production) appMenu.push({
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (!focusedWindow) return;
          focusedWindow.reload();
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (!focusedWindow) return;
          focusedWindow.webContents.toggleDevTools();
        },
      },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  });

  appMenu.push({
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ],
  }, {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://nautilus.js.org');
        },
      },
    ],
  });

  if (process.platform === 'darwin') {
    appMenu.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          role: 'services',
          submenu: [],
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });

    let windowMenu = findIndex(appMenu, { role: 'window' });
    appMenu[windowMenu].submenu = [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Zoom',
        role: 'zoom',
      },
      { type: 'separator' },
      {
        label: 'Bring All to Front',
        role: 'front',
      },
    ];
  }

  return appMenu;
};
