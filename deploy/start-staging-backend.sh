AMP_STAGING_MATCHING_ENGINE_IP=${AMP_STAGING_MATCHING_ENGINE_IP:-'$(docker-machine ip matching-engine)'} \
AMP_STAGING_CLIENT_IP=${AMP_STAGING_CLIENT_IP:-'$(docker-machine ip client)'} \
AMP_STAGING_RABBITMQ_IP=${AMP_STAGING_RABBITMQ_IP:-'$(docker-machine ip rabbitmq)'} \
AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS=${AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS} \
AMP_RINKEBY_FEE_ACCOUNT_ADDRESS=${AMP_RINKEBY_FEE_ACCOUNT_ADDRESS} \
AMP_STAGING_RABBITMQ_USERNAME=${AMP_STAGING_RABBITMQ_USERNAME} \
AMP_STAGING_RABBITMQ_PASSWORD=${AMP_STAGING_RABBITMQ_PASSWORD} \
AMP_STAGING_MONGODB_URL=${AMP_STAGING_MONGODB_URL} \
AMP_STAGING_MONGODB_USERNAME=${AMP_STAGING_MONGODB_USERNAME} \
AMP_STAGING_MONGODB_PASSWORD=${AMP_STAGING_MONGODB_PASSWORD} \
AMP_STAGING_INFURA_KEY=${AMP_STAGING_INFURA_KEY} \
AMP_CERTS_PATH=${AMP_CERTS_PATH}

STAGING_CONFIG_VERSION=64

eval $(docker-machine env rabbitmq)
docker config create rabbitmq-config-${STAGING_CONFIG_VERSION:-0} rabbitmq-staging.conf
docker config create rabbitmq-ca-cert-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq-staging/ca_certificate.pem
docker config create rabbitmq-server-cert-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq-staging/server_certificate.pem
docker config create rabbitmq-server-key-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq-staging/server_key.pem
docker config create rabbitmq-client-cert-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq-staging/client_certificate.pem
docker config create rabbitmq-client-key-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq-staging/client_key.pem
docker config create rabbitmq-full-key-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq-staging/server_full_key.pem

eval $(docker-machine env matching-engine)
docker config create matching-engine-ca-cert-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine-staging/ca_certificate.pem
docker config create matching-engine-server-cert-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine-staging/server_certificate.pem
docker config create matching-engine-server-key-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine-staging/server_key.pem
docker config create matching-engine-client-cert-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine-staging/client_certificate.pem
docker config create matching-engine-client-key-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine-staging/client_key.pem
docker config create matching-engine-full-key-${STAGING_CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine-staging/server_full_key.pem

echo "Deploying AMP with the following parameters:"
echo -e "Matching Engine IP: ${AMP_STAGING_MATCHING_ENGINE_IP}"
echo -e "Client IP: ${AMP_STAGING_CLIENT_IP}"
echo -e "Exchange Contract Address: ${AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS}"
echo -e "RabbitMQ Username: ${AMP_STAGING_RABBITMQ_USERNAME}"
echo -e "RabbitMQ Password: ${AMP_STAGING_RABBITMQ_PASSWORD}"
echo -e "MongoDB Username: ${AMP_STAGING_MONGODB_PASSWORD}"
echo -e "MongoDB Password: ${AMP_STAGING_MONGODB_USERNAME}"
echo -e "Infura Key: ${AMP_STAGING_INFURA_KEY}"

eval $(docker-machine env matching-engine)
STAGING_CONFIG_VERSION=${STAGING_CONFIG_VERSION} docker stack deploy -c docker-compose.staging-backend.yml amp-staging-backend