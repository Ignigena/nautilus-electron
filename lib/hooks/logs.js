module.exports = function NautilusElectronLogs(app) {
  process.on('uncaughtException', app.log.error);
};
