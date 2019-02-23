#!/usr/bin/env node

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const logger = require('./helpers/logger');
const { CronJob } = require('cron');

const serviceStartedNotification = require('./services/service-started-notification');
const getRecipientFiles = require('./services/get-recipients');
const getFilePath = require('./services/get-file-path');
const getFile = require('./services/get-file');
const sendInvoiceEmail = require('./services/send-email');
const archiveFile = require('./services/archive-file');
const sendSms = require('./services/sms');

const sendInvoice = () => {
  const recipientList = getRecipientFiles('./data');
  recipientList.forEach(async (personFile) => {
    try {
      if (personFile.includes('sample')) {
        return;
      }

      const recipient = require(personFile);
      const filePrefix = recipient['file-prefix'];

      const filePath = await getFilePath(filePrefix);

      const file = await getFile(filePath);

      await sendInvoiceEmail(file, recipient);

      await archiveFile(filePath, recipient);

      await sendSms(recipient);

      logger.info(`All done for ${recipient.name}! 👋`);

    } catch(error) {
      logger.info(error);
      logger.info('Email failed to send 🙃');
    }
  });
};

// Start the Cron
const job = new CronJob({
  cronTime: '* * * * * *', // Once every hour
  onTick: () => {
    logger.info('🏄  Surfing the net for the invoice');
    sendInvoice();
  },
  start: false,
  timeZone: 'Australia/Melbourne'
});

// Notify that the app has started
serviceStartedNotification();

// Kick off cron job
job.start();