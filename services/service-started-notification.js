const sendEmail = require('../helpers/mail');
const logger = require('../helpers/logger');

const serviceStartedNotification = () => {
  // Quick easy email notification to let me know the server started
  logger.info('===== Send That Invoice - started! =====');
  return sendEmail({
    email: 'davidj28827@gmail.com',
    subject: 'Send That Invoice - Started!',
    text: 'Hey Dave,\n\nYour Server just started!\n\nCheers',
    attachments: ''
  });

};

module.exports = serviceStartedNotification;