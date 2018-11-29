#!/bin/bash

cd $AMPENGINE
docker build -f Dockerfile -t proofsuite/amp-matching-engine:staging . 
docker push proofsuite/amp-matching-engine:staging

cd $AMPCLIENT
docker build -f Dockerfile -t proofsuite/amp-client:staging .
docker push proofsuite/amp-client:staging