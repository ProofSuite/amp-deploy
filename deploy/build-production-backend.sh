#!/bin/bash

cd $AMPENGINE
docker build -f Dockerfile -t proofsuite/amp-matching-engine:latest . 
docker push proofsuite/amp-matching-engine:latest

cd ${AMPDB}/deploy
./restart-production.sh