#!/usr/bin/env bash
set -euxo pipefail

echo 'Untar script started ⭐'
cd /opt/send-that-invoice
tar -zxvf package.tgz
rm -f package.tgz
npm install
npm run start