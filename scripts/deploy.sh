#!/usr/bin/env bash

set -e

if [ -f .env ]; then
  source .env
elif [ "$TRAVIS_EVENT_TYPE" = "pull_request" ]; then
  echo "Skipping deploy for PR update."
  exit
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  FTP_USER=$PRODUCTION_FTP_USER
  FTP_PASSWORD=$PRODUCTION_FTP_PASSWORD
  FTP_HOST=$PRODUCTION_FTP_HOST
  FTP_DIRECTORY=$PRODUCTION_FTP_DIRECTORY
elif [ "$TRAVIS_BRANCH" = "staging" ]; then
  FTP_USER=$STAGING_FTP_USER
  FTP_PASSWORD=$STAGING_FTP_PASSWORD
  FTP_HOST=$STAGING_FTP_HOST
  FTP_DIRECTORY=$STAGING_FTP_DIRECTORY
else
  exit
fi

wput --reupload --basename _site/ _site/* ftp://${FTP_USER}:${FTP_PASSWORD}@${FTP_HOST}/${FTP_DIRECTORY}/

