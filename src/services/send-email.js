const sendEmail = require('../helpers/mail');

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

  console.info('The email was sent! 📤');
};

module.exports = sendInvoiceEmail;