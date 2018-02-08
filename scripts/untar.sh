#!/usr/bin/env bash
set -euxo pipefail

echo 'Untar script started ⭐'
cd /opt/send-that-invoice
npm install -g forever
forever stop /opt/send-that-invoice/app.js || true
tar -zxvf package.tgz
rm -f package.tgz
npm install
systemctl restart send-that-invoice

