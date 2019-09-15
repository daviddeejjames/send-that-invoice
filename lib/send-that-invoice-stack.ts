import s3 = require('@aws-cdk/aws-s3');
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');

export class SendThatInvoiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = 'send-that-invoice-data';

    const dataBucket = new s3.Bucket(this, bucketName, {
      bucketName,
      versioned: true
    });

    // TODO: Pass im ENV Vars
    if (cdk.StackProps) {
      const lambdaName = 'send-that-invoice-lambda';
      const lambdaFn = new lambda.Function(this, lambdaName, {
        functionName: lambdaName,
        code: lambda.Code.asset('src'),
        handler: 'handler.main',
        timeout: cdk.Duration.seconds(300),
        runtime: lambda.Runtime.NODEJS_10_X,
        environment: {
          DATA_BUCKET: dataBucket.bucketName,
          MAIL_NAME: mailName,
          MAIL_USER: mailUser,
          MAIL_PASS: mailPass,
          MAIL_HOST: mailHost,
          MAIL_PORT: mailPort,
          MAIL_REPLY_TO: mailReplyTo,
          DROPBOX_TOKEN: dropboxToken,
          SNS_TOPIC_ARN: snsTopicArn
        }
      });

      // Run every day at 6PM UTC
      // See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
      const rule = new events.Rule(this, 'send-that-invoice-cron-rule', {
        schedule: events.Schedule.expression('cron(0 18 ? * * *)')
      });

      rule.addTarget(new targets.LambdaFunction(lambdaFn));
    }
  }
}
