# send-that-invoice 📤
[![Build Status](https://travis-ci.org/daviddeejjames/send-that-invoice.svg?branch=master)](https://travis-ci.org/daviddeejjames/send-that-invoice)

Node.js Lambda that automatically emails a file from a given Dropbox folder.
Also sends a text message via AWS SNS to verify an email has been sent.

## Uses
- [Dropbox JS SDK](https://github.com/dropbox/dropbox-sdk-js)
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- Other AWS services such as Lambda, SES, SNS and S3
- [Sentry](https://sentry.io) - Optional Error tracking

## Prerequisites
- Node & nvm
- AWS CDK - for deployment to AWS

## How It Works 🔧
The application was made for a very specific use case, however the general problem it resolves is to automate sending an invoice to a client.

This invoice is usually handwritten, scanned and uploaded to Dropbox. In the past, this would be then manually sent via email.

This application rectifies this by checking if the file has been uploaded to Dropbox and proceeds to generate the email and send it to the specific client as an email with an attachment, based on the uploaded file name prefix.

The application checks for the file every so often using a cron. These settings could be changed and the cron could be ditched in favor of a webhook connected to the particular Dropbox folder.

## Build & Run Locally 🧙‍
1. `npm install` to install CDK deps
2. Set environment variables in ```variables.env```
3. Set at least one ```person.json``` in ```data``` folder
4. `cd src` for lambda code
5. ```npm install```
6. ```npm start```

## AWS CDK Commands 🏗

> Run these from the root directory

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Moving data 🚛
Note that there is a script to move files from your local machine
to S3, to run this you will need the [AWS-CLI](https://aws.amazon.com/cli/) installed and connected to your AWS account

To run it simply use `npm run copy-data`

## Helpful Links 📚
- [Dropbox API Docs](http://dropbox.github.io/dropbox-sdk-js/)
- [Getting started with AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)

