#!/usr/bin/env node
import 'source-map-support/register';
import { SendThatInvoiceStack } from '../lib/send-that-invoice-stack';
import { App, Environment } from '@aws-cdk/core';

export interface StackProps {
  env: Environment;
  dataBucket: string | undefined;
  mailName: string | undefined;
  mailUser: string | undefined;
  mailPass: string | undefined;
  mailHost: string | undefined;
  mailPort: string | undefined;
  mailReplyTo: string | undefined;
  dropboxToken: string | undefined;
  snsTopicArn: string | undefined;
  sentryDsn: string | undefined;
}

const stackName = 'send-that-invoice-stack';
const app = new App();

const {
  AWS_ACCOUNT: account,
  AWS_DEFAULT_REGION: region,
  DATA_BUCKET: dataBucket,
  MAIL_NAME: mailName,
  MAIL_USER: mailUser,
  MAIL_PASS: mailPass,
  MAIL_HOST: mailHost,
  MAIL_PORT: mailPort,
  MAIL_REPLY_TO: mailReplyTo,
  DROPBOX_TOKEN: dropboxToken,
  SNS_TOPIC_ARN: snsTopicArn,
  SENTRY_DSN: sentryDsn
} = process.env;


new SendThatInvoiceStack(app, stackName, {
  env: {
    account,
    region,
  },
  dataBucket,
  mailName,
  mailUser,
  mailPass,
  mailHost,
  mailPort,
  mailReplyTo,
  dropboxToken,
  snsTopicArn,
  sentryDsn
});
