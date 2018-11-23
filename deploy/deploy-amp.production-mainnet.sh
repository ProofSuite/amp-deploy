AMP_PRODUCTION_MATCHING_ENGINE_IP=${AMP_PRODUCTION_MATCHING_ENGINE_IP:-'$(docker-machine ip matching-engine-production)'} \
AMP_PRODUCTION_CLIENT_IP=${AMP_PRODUCTION_CLIENT_IP:-'$(docker-machine ip client-production)'} \
AMP_PRODUCTION_RABBITMQ_IP=${AMP_PRODUCTION_RABBITMQ_IP:-'$(docker-machine ip rabbitmq-production)'} \
AMP_PRODUCTION_MONGODB_IP=${AMP_PRODUCTION_MONGODB_IP:-'$(docker-machine ip mongodb-production)'} \
AMP_PRODUCTION_EXCHANGE_CONTRACT_ADDRESS=${AMP_PRODUCTION_EXCHANGE_CONTRACT_ADDRESS} \
AMP_PRODUCTION_FEE_ACCOUNT_ADDRESS=${AMP_PRODUCTION_FEE_ACCOUNT_ADDRESS} \
AMP_PRODUCTION_RABBITMQ_URL=${AMP_PRODUCTION_RABBITMQ_URL} \
AMP_PRODUCTION_RABBITMQ_USERNAME=${AMP_PRODUCTION_RABBITMQ_USERNAME} \
AMP_PRODUCTION_RABBITMQ_PASSWORD=${AMP_PRODUCTION_RABBITMQ_PASSWORD} \
AMP_PRODUCTION_MONGODB_URL=${AMP_PRODUCTION_MONGODB_URL} \
AMP_PRODUCTION_MONGODB_USERNAME=${AMP_PRODUCTION_MONGODB_USERNAME} \
AMP_PRODUCTION_MONGODB_PASSWORD=${AMP_PRODUCTION_MONGODB_PASSWORD} \
AMP_PRODUCTION_INFURA_KEY=${AMP_PRODUCTION_INFURA_KEY} \
AMP_CERTS_PATH=${AMP_CERTS_PATH}

docker config create rabbitmq-config rabbitmq-production.conf
docker config create nginx-config nginx-production.conf

eval $(docker-machine env rabbitmq-production)

docker config create rabbitmq-ca-cert ${AMP_CERTS_PATH}/rabbitmq/ca_certificate.pem
docker config create rabbitmq-server-cert ${AMP_CERTS_PATH}/rabbitmq/server_certificate.pem
docker config create rabbitmq-server-key ${AMP_CERTS_PATH}/rabbitmq/server_key.pem
docker config create rabbitmq-client-cert ${AMP_CERTS_PATH}/rabbitmq/client_certificate.pem
docker config create rabbitmq-client-key ${AMP_CERTS_PATH}/rabbitmq/client_key.pem
docker config create rabbitmq-full-key ${AMP_CERTS_PATH}/rabbitmq/server_full_key.pem

eval $(docker-machine env mongodb-production)

docker config create mongodb-ca-cert ${AMP_CERTS_PATH}/mongodb/ca_certificate.pem
docker config create mongodb-server-cert ${AMP_CERTS_PATH}/mongodb/server_certificate.pem
docker config create mongodb-server-key ${AMP_CERTS_PATH}/mongodb/server_key.pem
docker config create mongodb-client-cert ${AMP_CERTS_PATH}/mongodb/client_certificate.pem
docker config create mongodb-client-key ${AMP_CERTS_PATH}/mongodb/client_key.pem
docker config create mongodb-full-key ${AMP_CERTS_PATH}/mongodb/server_full_key.pem

eval $(docker-machine env client-production)

docker config create client-ca-cert ${AMP_CERTS_PATH}/client/ca_certificate.pem
docker config create client-server-cert ${AMP_CERTS_PATH}/client/server_certificate.pem
docker config create client-server-key ${AMP_CERTS_PATH}/client/server_key.pem
docker config create client-client-cert ${AMP_CERTS_PATH}/client/client_certificate.pem
docker config create client-client-key ${AMP_CERTS_PATH}/client/client_key.pem
docker config create client-full-key ${AMP_CERTS_PATH}/client/server_full_key.pem

eval $(docker-machine env matching-engine-production)

docker config create matching-engine-ca-cert ${AMP_CERTS_PATH}/matching-engine/ca_certificate.pem
docker config create matching-engine-server-cert ${AMP_CERTS_PATH}/matching-engine/server_certificate.pem
docker config create matching-engine-server-key ${AMP_CERTS_PATH}/matching-engine/server_key.pem
docker config create matching-engine-client-cert ${AMP_CERTS_PATH}/matching-engine/client_certificate.pem
docker config create matching-engine-client-key ${AMP_CERTS_PATH}/matching-engine/client_key.pem
docker config create matching-engine-full-key ${AMP_CERTS_PATH}/matching-engine/server_full_key.pem

# docker-machine scp -r ${AMP_CERTS_PATH}/rabbitmq ubuntu@rabbitmq-production:~/
# docker-machine scp -r ${AMP_CERTS_PATH}/mongodb ubuntu@mongodb-production:~/
# docker-machine scp -r ${AMP_CERTS_PATH}/client ubuntu@client-production:~/

# docker-machine scp -r ${AMP_CERTS_PATH}/matching-engine ubuntu@matching-engine-production:~/
# docker-machine scp -r ${AMP_CERTS_PATH}/mongodb ubuntu@matching-engine-production:~/
# docker-machine scp -r ${AMP_CERTS_PATH}/rabbitmq ubuntu@matching-engine-production:~/

# docker-machine scp nginx-production.conf ubuntu@client-production:~/nginx.conf
# docker-machine scp rabbitmq-production.conf ubuntu@rabbitmq-production:~/rabbitmq.conf

echo "Deploying AMP with the following parameters:"
echo -e "Matching Engine IP: ${AMP_PRODUCTION_MATCHING_ENGINE_IP}"
echo -e "Client IP: ${AMP_PRODUCTION_CLIENT_IP}"
echo -e "Exchange Contract Address: ${AMP_PRODUCTION_EXCHANGE_CONTRACT_ADDRESS}"
echo -e "RabbitMQ Username: ${AMP_PRODUCTION_RABBITMQ_USERNAME}"
echo -e "RabbitMQ Password: ${AMP_PRODUCTION_RABBITMQ_PASSWORD}"
echo -e "RabbitMQ URL: ${AMP_PRODUCTION_RABBITMQ_URL}"
echo -e "MongoDB PW: ${AMP_PRODUCTION_MONGODB_PASSWORD}"
echo -e "Infura Key: ${AMP_PRODUCTION_INFURA_KEY}"

docker stack deploy -c docker-compose.production-mainnet.yml amp-production