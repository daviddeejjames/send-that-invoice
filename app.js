#!/usr/bin/env node

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Include helper files
const attachedFile = require('./helpers/attached-file');
const mail = require('./helpers/mail');
const recipients = require('./helpers/recipients');
const logger = require('./helpers/logger').logger;

const AWS = require('aws-sdk');
const CronJob = require('cron').CronJob;

AWS.config.update({ region: 'ap-southeast-2' });

// Quick easy email notification to let me know the server started after deployment
const mailOutput = mail.send({
  email: 'davidj28827@gmail.com',
  subject: 'Send That Invoice - Started!',
  text: 'Hey Dave,\n\nYour Server just started!\n\nCheers',
  attachments: ''
});

logger.info('===== Send That Invoice - started! =====');

// Start the Cron
const job = new CronJob({
  cronTime: '00 00 * * * *', // Once every hour
  onTick: function(){
    logger.info('🏄  Surfing the net for the invoice');
    sendInvoice();
  },
  start: false,
  timeZone: 'Australia/Melbourne'
});
job.start();

function sendInvoice() {
  const recipientList = recipients.getRecipientFiles('./data');
  recipientList.forEach(personFile => {
    if (personFile.includes('sample')) {
      return;
    }
    const recipient = require(personFile);
    const filePrefix = recipient['file-prefix'];
    let foundFilePath;

    // Get the file, email it then archive it!
    const sendInvoice = attachedFile.searchFilePath(filePrefix)
      .then(function (filePath){
        foundFilePath = filePath;
        const file = attachedFile.getFile(filePath);
        return file;
      })
      .then(function (file) {
        const mailPromise = mail.send({
          email: recipient.email,
          subject: recipient.subject,
          text: recipient.text,
          attachments: {   // binary buffer as an attachment
            filename: file.name,
            content: new Buffer(file.fileBinary, 'binary'),
            encoding: 'binary'
          }
        });
        return mailPromise;
      })
      .then(function () {
        logger.info('The email was sent! 📤');
        const archiveFile = attachedFile.archiveFile(foundFilePath, recipient.name);
        return archiveFile;
      })
      .then(function() {
        if (!process.env.SNS_TOPIC_ARN) {
          return;
        }

        logger.info('Sending SMS to Mum via SNS! 📱');

        const sns_params = {
          Message: `Invoice sent to ${recipient.name}! 📤 from your friendly robot 🤖`,
          TopicArn: process.env.SNS_TOPIC_ARN
        };
        const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(sns_params).promise();
        return publishTextPromise;
      })
      .then(function() {
        logger.info('SMS sent successfully! 🌟');
        return;
      })
      .catch(function (error) {
        logger.info(error);
        logger.info('Email failed to send 🙃');
        return Promise.reject(error);
      });
  });
}
