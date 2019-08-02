const basicAuth = require('express-basic-auth');
const agendash = require('agendash');
const { Container } = require('typedi');
const config = require('../../config');

module.exports = app => {
  const agendaInstance = Container.get('agendaInstance');

  app.use(
    '/dash',
    basicAuth({
      users: {
        [config.agendash.user]: config.agendash.password,
      },
      challenge: true,
    }),
    agendash(agendaInstance),
  );
};
