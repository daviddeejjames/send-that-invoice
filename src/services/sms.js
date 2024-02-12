const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-southeast-2' });

/**
 * Send an SMS via AWS SNS
 */
const sendSms = async (recipient, snsTopicArn) => {
  // Shortcircut if SNS is not set
  if (!snsTopicArn) {
    return;
  }

  console.log('Sending SMS to Mum via SNS! 📱');

  const sns_params = {
    Message: `Invoice sent to ${recipient.name} - ${recipient.email}! 📤 from your friendly robot 🤖`,
    TopicArn: snsTopicArn
  };
  const publishTextPromise =
    await new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(sns_params)
      .promise();
  console.log('SMS sent successfully! 🌟');
  return publishTextPromise;
};

module.exports = sendSms;