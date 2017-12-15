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

exports.send = async (options) => {
  const text = 'Hello World';
  const attachments = [];

  const mailOptions = {
    from: 'David James <noreply@dfjames.com>',
    subject: options.subject,
    to: options.email,
    text,
    attachments
  };

  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};