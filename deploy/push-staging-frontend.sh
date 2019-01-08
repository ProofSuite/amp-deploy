#!/bin/bash

cd $AMPCLIENT
docker build -f Dockerfile -t proofsuite/amp-client:staging .
docker push proofsuite/amp-client:staging