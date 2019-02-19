#!/usr/bin/env node

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Include helper files
const attachedFile = require('./helpers/attached-file');

const recipients = require('./services/get-recipients');
const logger = require('./helpers/logger').logger;


const CronJob = require('cron').CronJob;

// Start the Cron
const job = new CronJob({
  cronTime: '00 00 * * * *', // Once every hour
  onTick: () => {
    logger.info('🏄  Surfing the net for the invoice');
    sendInvoice();
  },
  start: false,
  timeZone: 'Australia/Melbourne'
});
job.start();

const sendInvoice = () => {
  const recipientList = recipients.getRecipientFiles('./data');
  recipientList.forEach(personFile => {
    if (personFile.includes('sample')) {
      return;
    }
    const recipient = require(personFile);
    const filePrefix = recipient['file-prefix'];

    // Get the file, email it then archive it!
    const sentInvoice =
      .then(filePath => {
        // Find the file
      })
      .then(file => {
        // Send File
      })
      .then(() => {
        // Archive file
      })
      .then(() => {
        // Send SMS
      })
      .catch(error => {
        logger.info(error);
        logger.info('Email failed to send 🙃');
        return Promise.reject(error);
      });

    return sentInvoice;
  });
};
