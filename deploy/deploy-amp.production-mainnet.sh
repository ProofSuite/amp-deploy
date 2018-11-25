AMP_PRODUCTION_MATCHING_ENGINE_IP=${AMP_PRODUCTION_MATCHING_ENGINE_IP:-'$(docker-machine ip matching-engine-production)'} \
AMP_PRODUCTION_CLIENT_IP=${AMP_PRODUCTION_CLIENT_IP:-'$(docker-machine ip client-production)'} \
AMP_PRODUCTION_RABBITMQ_IP=${AMP_PRODUCTION_RABBITMQ_IP:-'$(docker-machine ip rabbitmq-production)'} \
AMP_PRODUCTION_EXCHANGE_CONTRACT_ADDRESS=${AMP_PRODUCTION_EXCHANGE_CONTRACT_ADDRESS} \
AMP_PRODUCTION_FEE_ACCOUNT_ADDRESS=${AMP_PRODUCTION_FEE_ACCOUNT_ADDRESS} \
AMP_PRODUCTION_RABBITMQ_USERNAME=${AMP_PRODUCTION_RABBITMQ_USERNAME} \
AMP_PRODUCTION_RABBITMQ_PASSWORD=${AMP_PRODUCTION_RABBITMQ_PASSWORD} \
AMP_PRODUCTION_MONGODB_URL=${AMP_PRODUCTION_MONGODB_URL} \
AMP_PRODUCTION_MONGODB_USERNAME=${AMP_PRODUCTION_MONGODB_USERNAME} \
AMP_PRODUCTION_MONGODB_PASSWORD=${AMP_PRODUCTION_MONGODB_PASSWORD} \
AMP_PRODUCTION_INFURA_KEY=${AMP_PRODUCTION_INFURA_KEY} \
AMP_CERTS_PATH=${AMP_CERTS_PATH}

CONFIG_VERSION=29

eval $(docker-machine env rabbitmq-production)

docker config create rabbitmq-config-${CONFIG_VERSION:-0} rabbitmq-production.conf
docker config create rabbitmq-ca-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq/ca_certificate.pem
docker config create rabbitmq-server-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq/server_certificate.pem
docker config create rabbitmq-server-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq/server_key.pem
docker config create rabbitmq-client-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq/client_certificate.pem
docker config create rabbitmq-client-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq/client_key.pem
docker config create rabbitmq-full-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/rabbitmq/server_full_key.pem

# eval $(docker-machine env mongodb-production)

docker config create mongodb-ca-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/mongodb/ca_certificate.pem
docker config create mongodb-server-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/mongodb/server_certificate.pem
docker config create mongodb-server-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/mongodb/server_key.pem
docker config create mongodb-client-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/mongodb/client_certificate.pem
docker config create mongodb-client-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/mongodb/client_key.pem
docker config create mongodb-full-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/mongodb/server_full_key.pem

eval $(docker-machine env client-production)

docker config create nginx-config-${CONFIG_VERSION:-0} nginx-production.conf
docker config create client-ca-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/client/ca_certificate.pem
docker config create client-server-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/client/server_certificate.pem
docker config create client-server-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/client/server_key.pem
docker config create client-client-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/client/client_certificate.pem
docker config create client-client-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/client/client_key.pem
docker config create client-full-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/client/server_full_key.pem

eval $(docker-machine env matching-engine-production)

docker config create matching-engine-ca-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine/ca_certificate.pem
docker config create matching-engine-server-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine/server_certificate.pem
docker config create matching-engine-server-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine/server_key.pem
docker config create matching-engine-client-cert-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine/client_certificate.pem
docker config create matching-engine-client-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine/client_key.pem
docker config create matching-engine-full-key-${CONFIG_VERSION:-0} ${AMP_CERTS_PATH}/matching-engine/server_full_key.pem

echo "Deploying AMP with the following parameters:"
echo -e "Matching Engine IP: ${AMP_PRODUCTION_MATCHING_ENGINE_IP}"
echo -e "Client IP: ${AMP_PRODUCTION_CLIENT_IP}"
echo -e "RabbitMQ IP: ${AMP_PRODUCTION_RABBITMQ_IP}"
echo -e "MongoDB IP: ${AMP_PRODUCTION_MONGODB_IP}"
echo -e "Exchange Contract Address: ${AMP_PRODUCTION_EXCHANGE_CONTRACT_ADDRESS}"
echo -e "RabbitMQ Username: ${AMP_PRODUCTION_RABBITMQ_USERNAME}"
echo -e "RabbitMQ Password: ${AMP_PRODUCTION_RABBITMQ_PASSWORD}"
echo -e "MongoDB Username: ${AMP_PRODUCTION_MONGODB_PASSWORD}"
echo -e "MongoDB Password: ${AMP_PRODUCTION_MONGODB_USERNAME}"
echo -e "Infura Key: ${AMP_PRODUCTION_INFURA_KEY}"

CONFIG_VERSION=${CONFIG_VERSION} docker stack deploy -c docker-compose.production-mainnet.yml amp-production