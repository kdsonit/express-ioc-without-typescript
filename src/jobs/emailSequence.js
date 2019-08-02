const { Container } = require('typedi');
// const MailerService = require('../services/mailer');

class EmailSequenceJob {
  async handler(job, done) {
    const Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Email Sequence Job triggered!');
      const { email, name } = job.data;
      /* const mailerServiceInstance = Container.get(MailerService);
            await mailerServiceInstance.StartEmailSequence('WelcomeSequence', {
                email,
                name
            }); */
      done();
    } catch (e) {
      Logger.error('🔥 Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}

module.exports = EmailSequenceJob;
