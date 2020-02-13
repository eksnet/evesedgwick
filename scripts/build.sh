#!/usr/bin/env bash

set -e

if [ -f .env ]; then
    source .env
fi

export BUILD_SEARCH_INDEX=true

bundle exec jekyll build
