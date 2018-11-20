# This scripts deploys the amp-client:develop and amp-matching-engine:develop images
# The following environment variables preferably need to be set
AMP_RINKEBY_MATCHING_ENGINE_IP=${AMP_RINKEBY_MATCHING_ENGINE_IP:-'13.125.100.61'} \
AMP_RINKEBY_CLIENT_IP=${AMP_RINKEBY_CLIENT_IP:-'13.125.177.169'} \
AMP_RINKEBY_ETHEREUM_IP=${AMP_RINKEBY_ETHEREUM_IP:-'13.125.62.193'} \
AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS=${AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS} \
AMP_RINKEBY_WETH_CONTRACT_ADDRESS=${AMP_RINKEBY_WETH_CONTRACT_ADDRESS} \
AMP_RINKEBY_FEE_ACCOUNT_ADDRESS=${AMP_RINKEBY_FEE_ACCOUNT_ADDRESS} \
AMP_RINKEBY_ETHERBASE=${AMP_RINKEBY_ETHERBASE} \

echo "Deploying AMP with the following parameters:"
echo "Matching Engine IP: ${AMP_RINKEBY_MATCHING_ENGINE_IP}"
echo "Client IP: ${AMP_RINKEBY_MATCHING_CLIENT_IP}"
echo "Ethereum IP: ${AMP_RINKEBY_ETHEREUM_IP}"
echo "Exchange Contract Address: ${AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS}"
echo "WETH Contract Address: ${AMP_RINKEBY_WETH_CONTRACT_ADDRESS}"
echo "Fee Account Address: ${AMP_RINKEBY_FEE_ACCOUNT_ADDRESS}"
echo "Rinkeby Etherbase: ${AMP_RINKEBY_ETHERBASE}"

docker stack deploy -c docker-compose.develop-rinkeby.yml amp