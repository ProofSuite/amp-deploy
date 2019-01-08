#!/bin/bash

cd $AMPENGINE
docker build -f Dockerfile -t proofsuite/amp-matching-engine:staging . 
docker push proofsuite/amp-matching-engine:staging