# send-that-invoice 📤
[![Build Status](https://travis-ci.org/daviddeejjames/send-that-invoice.svg?branch=master)](https://travis-ci.org/daviddeejjames/send-that-invoice)

Node.js Lambda that automatically emails a file from a given Dropbox folder.
Also sends a text message via AWS SNS to verify an email has been sent.

## Uses
- [Dropbox JS SDK](https://github.com/dropbox/dropbox-sdk-js)
- [AWS CDK]()
- Other AWS services such as Lambda, SES, SNS and S3

## How It Works 🔧
The application was made for a very specific use case, however the general problem it resolves is to automate sending an invoice to a client.

This invoice is usually handwritten, scanned and uploaded to Dropbox. In the past, this would be then manually sent via email.

This application rectifies this by checking if the file has been uploaded to Dropbox and proceeds to generate the email and send it to the specific client as an email with an attachment, based on the uploaded file name prefix.

The application checks for the file every hour using a cron. These settings could be changed and the cron could be ditched in favor of a webhook connected to the particular Dropbox folder.

## Build & Usage :alien:
1. Clone repo and cd into ```src```
1. Set environment variables in ```variables.env```
1. Set at least one ```person.json``` in ```data``` folder
1. ```npm install```
1. ```npm start```

## Other useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Helpful Links
- [Dropbox API Docs](http://dropbox.github.io/dropbox-sdk-js/)
- [Getting started with AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
