#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { SendThatInvoiceStack } from '../lib/send-that-invoice-stack';

const app = new cdk.App();
new SendThatInvoiceStack(app, 'SendThatInvoiceStack');
