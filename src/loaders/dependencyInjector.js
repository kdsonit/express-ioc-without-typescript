const { Container } = require('typedi');
const LoggerInstance = require('./logger');
const agendaFactory = require('./agenda');

module.exports = ({ mongoConnection, models }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({
      mongoConnection,
    });

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('✌️ Agenda injected into container');

    return {
      agenda: agendaInstance,
    };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
