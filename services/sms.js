/**
 * Send an SMS via AWS SNS
 */
const AWS = require('aws-sdk');
const logger = require('./helpers/logger').logger;

AWS.config.update({ region: 'ap-southeast-2' });

async function sendSms(recipient) {
  // Shortcircut if SNS is not set
  if (!process.env.SNS_TOPIC_ARN) {
    return;
  }

  logger.info('Sending SMS to Mum via SNS! 📱');

  const sns_params = {
    Message: `Invoice sent to ${recipient.name}! 📤 from your friendly robot 🤖`,
    TopicArn: process.env.SNS_TOPIC_ARN
  };
  const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(sns_params).promise();
  logger.info('SMS sent successfully! 🌟');
  return publishTextPromise;
}

export default sendSms;