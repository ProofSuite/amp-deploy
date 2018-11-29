#!/bin/bash

cd $AMPENGINE
docker build -f Dockerfile -t proofsuite/amp-matching-engine:latest . 
docker push proofsuite/amp-matching-engine:latest

cd $AMPCLIENT
docker build -f Dockerfile -t proofsuite/amp-client:latest .
docker push proofsuite/amp-client:latest

./start_production_frontend.sh
./start_production_backend.sh