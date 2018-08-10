#!/usr/bin/env bash

set -e

if [ -f .env ]; then
    source .env
fi

wput --basename _site _site ftp://${FTP_USER}:${FTP_PASSWORD}@${FTP_HOST}${FTP_DIRECTORY}/

