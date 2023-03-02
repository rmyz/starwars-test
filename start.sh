#!/usr/bin/env bash

docker build -t starwars-test .
docker run -d -p 3000:3000 starwars-test
