class MailerService {
  SendWelcomeEmail() {
    return {
      delivered: 1,
      status: 'ok',
    };
  }

  StartEmailSequence(sequence, user) {
    if (!user.email) {
      throw new Error('No email provided');
    }

    return {
      delivered: 1,
      status: 'ok',
    };
  }
}

module.exports = MailerService;
