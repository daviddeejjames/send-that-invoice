const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/**
 * Sends the email with nodemailer!
 *
 * @param {Object} options - Mail options for sending
 */
const sendEmail = async (options) => {
  const text = options.text;
  const attachments = options.attachments;

  const mailOptions = {
    from: process.env.MAIL_NAME + ' <' + process.env.MAIL_USER + '>',
    subject: options.subject,
    to: options.email,
    replyTo: process.env.MAIL_REPLY_TO,
    text,
    attachments
  };

  const sendMail = promisify(transport.sendMail, transport);
  return await sendMail(mailOptions);
};

module.exports = sendEmail;