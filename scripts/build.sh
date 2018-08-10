#!/usr/bin/env bash

set -e

if [ -f .env ]; then
    source .env
fi

export JEKYLL_VERSION=3.8
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  jekyll build

