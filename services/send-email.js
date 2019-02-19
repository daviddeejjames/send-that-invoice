const logger = require('./helpers/logger').logger;
const { sendEmail } = require('./helpers/mail');

async function sendInvoiceEmail(file, recipient) {
  await sendEmail({
    email: recipient.email,
    subject: recipient.subject,
    text: recipient.text,
    attachments: {   // binary buffer as an attachment
      filename: file.name,
      content: new Buffer(file.fileBinary, 'binary'),
      encoding: 'binary'
    }
  });

  logger.info('The email was sent! 📤');
}

export default sendInvoiceEmail;