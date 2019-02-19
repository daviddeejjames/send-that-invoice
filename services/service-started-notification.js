const mail = require('./helpers/mail');
const logger = require('./helpers/logger').logger;

async function serviceStartedNotification() {
  // Quick easy email notification to let me know the server started
  mail.send({
    email: 'davidj28827@gmail.com',
    subject: 'Send That Invoice - Started!',
    text: 'Hey Dave,\n\nYour Server just started!\n\nCheers',
    attachments: ''
  });

  logger.info('===== Send That Invoice - started! =====');
}

export default serviceStartedNotification;