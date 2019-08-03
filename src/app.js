require('reflect-metadata');
const express = require('express');
const config = require('./config');

const Logger = require('./loaders/logger');
const loaders = require('./loaders');

async function startServer() {
  const app = express();

  await loaders({
    expressApp: app,
  });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
