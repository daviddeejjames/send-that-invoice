#!/usr/bin/env node
const Sentry = require('@sentry/node');

const getRecipientFiles = require('./services/get-recipients');
const getFilePath = require('./services/get-file-path');
const getFile = require('./services/get-file');
const sendInvoiceEmail = require('./services/send-email');
const archiveFile = require('./services/archive-file');
const sendSms = require('./services/sms');

const {
  NODE_ENV: nodeEnv,
  DATA_BUCKET: dataBucket,
  SNS_TOPIC_ARN: snsTopicArn,
  SENTRY_DSN: sentryDsn
} = process.env;

module.exports.main = async () => {
  console.log('Send That Invoice Lambda started... 📣');
  try {
    const recipientList = await getRecipientFiles(dataBucket);
    await Promise.all(
      recipientList.map(async recipient => {
        const filePrefix = recipient['file-prefix'];
        const filePath = await getFilePath(filePrefix);
        if(filePath) {
          const file = await getFile(filePath);
          await sendInvoiceEmail(file, recipient);
          await archiveFile(filePath, recipient);
          await sendSms(recipient, snsTopicArn);
          console.log(`All done for ${recipient.name}! 👋`);
        } else {
          console.warn('File not found in Dropbox 😢');
        }
      })
    );
    console.log('Send That Invoice Lambda completed! ✅');
  } catch (error) {
    if (sentryDsn && nodeEnv != 'development') {
      Sentry.init({ dsn: sentryDsn });
      Sentry.captureException(error);
    }
    console.error(error);
  }
};
