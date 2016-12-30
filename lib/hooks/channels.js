const { ipcMain } = require('electron');

// Channels are the API equivelant of Electron and allow the front-end of the
// application to talk to the back-end. To make this a little easier, and to
// help avoid a flood of watchers that can come from a large codebase, the
// `channels` hook exists. Simply create a `channels` folder in your application
// and each one will be bootstrapped at application launch with it's own
// dedicated event listener to respond to messages from the frontend.
module.exports = function NautilusElectronChannels(app) {
  app.channels = {};

  // Each channel is written as a hook and must return a key/value representing
  // the types of messages to listen for. The name of the file is used to
  // determine the IPC channel and only one event listener is added per channel.
  app.events.on('hooks:loaded:channels', function(channel, types) {
    app.channels[channel] = types;

    ipcMain.on(channel, (event, type, message) => {
      app.log.verbose(`channel[${channel}:${type}] ${message || 'triggered with no message'}`);

      // If the channel receives a communication type it's not configured for,
      // the `default` action is triggered. If no default action is available
      // the communication will be returned without a value.
      if (!type || !app.channels[channel][type]) {
        if (!app.channels[channel].default) return;
        let defaultReturn = app.channels[channel].default(message);
        event.returnValue = defaultReturn || null;
      }

      let returnValue = app.channels[channel][type](message);
      event.returnValue = returnValue || null;
    });
  });
};
