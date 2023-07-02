import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { StackProps } from '../bin/send-that-invoice';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_sns as sns } from "aws-cdk-lib";  
import { aws_events as events } from 'aws-cdk-lib';
import { aws_events_targets as targets } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';   

export class SendThatInvoiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    // Ensure all ENV vars are set
    if (Object.values(props).every((item) => item)) {
      const {
        dataBucket,
        mailName,
        mailUser,
        mailPass,
        mailHost,
        mailPort,

        mailReplyTo,
        dropboxToken,
        snsTopicArn,
        sentryDsn,
      } = props;

      const bucket = new s3.Bucket(this, `${dataBucket}`, {
        bucketName: dataBucket,
        versioned: true,
      });

      const lambdaName = 'send-that-invoice-lambda';
      const lambdaFn = new lambda.Function(this, lambdaName, {
        functionName: lambdaName,
        code: lambda.Code.fromAsset('src'),
        handler: 'handler.main',
        timeout: cdk.Duration.seconds(300),
        runtime: lambda.Runtime.NODEJS_18_X,
        environment: {
          DATA_BUCKET: `${bucket.bucketName}`,
          MAIL_NAME: `${mailName}`,
          MAIL_USER: `${mailUser}`,
          MAIL_PASS: `${mailPass}`,
          MAIL_HOST: `${mailHost}`,
          MAIL_PORT: `${mailPort}`,
          MAIL_REPLY_TO: `${mailReplyTo}`,
          DROPBOX_TOKEN: `${dropboxToken}`,
          SNS_TOPIC_ARN: `${snsTopicArn}`,
          SENTRY_DSN: `${sentryDsn}`,
        },
      });

      bucket.grantReadWrite(lambdaFn);
      const snsTopic = sns.Topic.fromTopicArn(
        this,
        'SendThatInvoice',
        `${snsTopicArn}`
      );
      snsTopic.grantPublish(lambdaFn);

      const rule = new events.Rule(this, 'send-that-invoice-cron-rule', {
        schedule: events.Schedule.expression('rate(1 hour)'),
      });

      rule.addTarget(new targets.LambdaFunction(lambdaFn));
    } else {
      console.error(
        "It seems you haven't set one of your ENV vars correctly, please check below"
      );
      console.error(props);
      process.exit(1);
    }
  }
}
