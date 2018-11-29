# docker-machine scp -r ${AMP_CERTS_PATH}/amp_matching-engine.crt:/etc/ssl/amp_matching-engine.crt
# docker-machine scp -r ${AMP_CERTS_PATH}/amp_matching-engine.key::/etc/ssl/amp_matching-engine.key
# docker-machine scp -r ${AMP_CERTS_PATH}/amp_client.crt:/etc/ssl/amp_client.crt
# docker-machine scp -r ${AMP_CERTS_PATH}/amp_client.key:/etc/ssl/amp_client.key
# docker-machine scp -r ${AMP_CERTS_PATH}/map_mongodb.crt:/etc/ssl/amp_mongodb.crt
# docker-machine scp -r ${AMP_CERTS_PATH}/map_mongodb.key:/etc/ssl/amp_mongodb.key
# docker-machine scp -r ${AMP_CERTS_PATH}/map_rabbitmq.crt:/etc/ssl/amp_rabbitmq.crt
# docker-machine scp -r ${AMP_CERTS_PATH}/map_rabbitmq.key:/etc/ssl/amp_rabbitmq.key

docker-machine scp -r ${AMP_CERTS_PATH} matching-engine-production:/etc/ssl
docker-machine scp -r ${AMP_CERTS_PATH} client-production:/etc/ssl
docker-machine scp -r ${AMP_CERTS_PATH} mongodb-production:/etc/ssl
docker-machine scp -r ${AMP_CERTS_PATH} rabbitmq-production:/etc/ssl