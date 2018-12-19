#!/bin/bash

AMP_RINKEBY_MATCHING_ENGINE_IP=${AMP_RINKEBY_MATCHING_ENGINE_IP:-'52.78.227.253'} \
AMP_RINKEBY_CLIENT_IP=${AMP_RINKEBY_CLIENT_IP:-'13.125.177.169'} \
AMP_RINKEBY_ETHEREUM_IP=${AMP_RINKEBY_ETHEREUM_IP:-'13.125.62.193'} \
AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS=${AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS} \
AMP_RINKEBY_FEE_ACCOUNT_ADDRESS=${AMP_RINKEBY_FEE_ACCOUNT_ADDRESS} \

STAGING_CONFIG_VERSION=31

eval $(docker-machine env client)
docker config create nginx-staging-config-${STAGING_CONFIG_VERSION:-0} nginx-staging.conf

echo "Deploying AMP (Staging) with the following parameters:"
echo "Matching Engine IP: ${AMP_RINKEBY_MATCHING_ENGINE_IP}"
echo "Client IP: ${AMP_RINKEBY_CLIENT_IP}"
echo "Ethereum IP: ${AMP_RINKEBY_ETHEREUM_IP}"
echo "Exchange Contract Address: ${AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS}"
echo "Fee Account Address: ${AMP_RINKEBY_FEE_ACCOUNT_ADDRESS}"

eval $(docker-machine env matching-engine)
CONFIG_VERSION=${CONFIG_VERSION} docker stack deploy -c docker-compose.staging-backend.yml amp-staging-backend --prune