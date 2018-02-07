#!/usr/bin/env bash
set -euxo pipefail

echo 'Untar script started ⭐'
cd /opt/send-that-invoice
npm install -g forever
forever stop /opt/send-that-invoice/app.js || true
tar -zxvf package.tgz
rm -f package.tgz
npm install
forever start /opt/send-that-invoice/app.js > /root/output.log 2>&1
