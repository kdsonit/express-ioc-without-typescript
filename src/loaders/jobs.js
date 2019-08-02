const config = require('../config');
const EmailSequenceJob = require('../jobs/emailSequence');

module.exports = ({ agenda }) => {
  agenda.define(
    'send-email',
    {
      priority: 'high',
      concurrency: config.agenda.concurrency,
    },

    new EmailSequenceJob().handler,
  );

  agenda.start();
};
