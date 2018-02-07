#!/usr/bin/env bash
set -euxo pipefail

tar -cvzf package.tgz --exclude=.git --exclude=package.tgz --exclude=variables.env --exclude=data --exclude=deploy .
scp package.tgz "$REMOTE_USER"@"$REMOTE_HOST":"$REMOTE_APP_DIR"
ssh "$REMOTE_USER"@"$REMOTE_HOST" 'bash -s' < ./scripts/untar.sh
echo 'Deploy script complete 🌽'