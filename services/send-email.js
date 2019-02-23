const sendEmail = require('../helpers/mail');
const logger = require('../helpers/logger');

const sendInvoiceEmail = async (file, recipient) => {
  await sendEmail({
    email: recipient.email,
    subject: recipient.subject,
    text: recipient.text,
    attachments: {   // binary buffer as an attachment
      filename: file.name,
      content: new Buffer.from(file.fileBinary, 'binary'),
      encoding: 'binary'
    }
  });

  logger.info('The email was sent! 📤');
};

module.exports = sendInvoiceEmail;