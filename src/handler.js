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
  try {
    const recipientList = await getRecipientFiles(dataBucket);
    recipientList.forEach(async recipient => {
      const filePrefix = recipient['file-prefix'];
      const filePath = await getFilePath(filePrefix);
      const file = await getFile(filePath);

      await sendInvoiceEmail(file, recipient);
      await archiveFile(filePath, recipient);
      await sendSms(recipient, snsTopicArn);
      console.info(`All done for ${recipient.name}! 👋`);
    });
  } catch (error) {
    if(sentryDsn && nodeEnv === 'production') {
      Sentry.init({ dsn: sentryDsn });
      Sentry.captureException(error);
    }
    console.error(error);
  }
};