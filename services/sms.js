const AWS = require('aws-sdk');
const logger = require('../helpers/logger');

AWS.config.update({ region: 'ap-southeast-2' });

/**
 * Send an SMS via AWS SNS
 */
const sendSms = async (recipient) => {
  // Shortcircut if SNS is not set
  if (!process.env.SNS_TOPIC_ARN) {
    return;
  }

  logger.info('Sending SMS to Mum via SNS! 📱');

  const sns_params = {
    Message: `Invoice sent to ${recipient.name}! 📤 from your friendly robot 🤖`,
    TopicArn: process.env.SNS_TOPIC_ARN
  };
  const publishTextPromise =
    await new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(sns_params)
      .promise();
  logger.info('SMS sent successfully! 🌟');
  return publishTextPromise;
};

module.exports = sendSms;