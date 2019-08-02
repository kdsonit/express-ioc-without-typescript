const Agenda = require('agenda');
const config = require('../config');

module.exports = ({ mongoConnection }) => {
  return new Agenda({
    mongo: mongoConnection,
    db: {
      collection: config.agenda.dbCollection,
    },
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  });
};
