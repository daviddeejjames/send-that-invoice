#!/usr/bin/env node

const logger = require('./helpers/logger');

const getRecipientFiles = require('./services/get-recipients');
const getFilePath = require('./services/get-file-path');
const getFile = require('./services/get-file');
const sendInvoiceEmail = require('./services/send-email');
const archiveFile = require('./services/archive-file');
const sendSms = require('./services/sms');

exports.handler = () => {
  const recipientList = getRecipientFiles('./data');
  recipientList.forEach(async personFile => {
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
    } catch (error) {
      logger.info(error);
      logger.info('Email failed to send 🙃');
    }
  });
};
