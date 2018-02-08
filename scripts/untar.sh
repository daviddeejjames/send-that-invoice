#!/usr/bin/env bash
set -euxo pipefail

echo 'Untar script started ⭐'
cd /opt/send-that-invoice
npm install -g forever
forever stop ./app.js || true
tar -zxvf package.tgz
rm -f package.tgz
npm install
chmod +x app.js
forever start ./app.js

