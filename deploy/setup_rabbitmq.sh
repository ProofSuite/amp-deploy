if [ ! "$(docker ps -q -f name=rabbitmq)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=rabbitmq)" ]; then
        docker rm rabbitmq
    fi

    docker create --name rabbitmq -p 5672:5672 -p 5671:5671 rabbitmq
    docker cp ./rabbitmq-production.conf rabbitmq:/etc/rabbitmq/rabbitmq.conf
    docker cp ${AMP_CERTS_PATH}/rabbitmq/ca_certificate.pem rabbitmq:/etc/ssl/ca_certificate.pem
    docker cp ${AMP_CERTS_PATH}/rabbitmq/ca_key.pem rabbitmq:/etc/ssl/ca_key.pem
    docker cp ${AMP_CERTS_PATH}/rabbitmq/server_key.pem rabbitmq:/etc/ssl/server_key.pem
    docker cp ${AMP_CERTS_PATH}/rabbitmq/server_certificate.pem rabbitmq:/etc/ssl/server_certificate.pem
    docker container start rabbitmq
    docker container exec -it rabbitmq rabbitmqctl start_app
    docker container exec -it rabbitmq rabbitmqctl add_user hey hey
    docker container exec -it rabbitmq rabbitmqctl set_user_tags hey administrator
    docker container exec -it rabbitmq rabbitmqctl set_permissions hey ".*" ".*" ".*"
else
    docker container stop rabbitmq
    docker cp ./rabbitmq-production.conf rabbitmq:/etc/rabbitmq/rabbitmq.conf
    docker cp ${AMP_CERTS_PATH}/rabbitmq/ca_certificate.pem rabbitmq:/etc/ssl/ca_certificate.pem
    docker cp ${AMP_CERTS_PATH}/rabbitmq/ca_key.pem rabbitmq:/etc/ssl/ca_key.pem
    docker cp ${AMP_CERTS_PATH}/rabbitmq/server_key.pem rabbitmq:/etc/ssl/server_key.pem
    docker cp ${AMP_CERTS_PATH}/rabbitmq/server_certificate.pem rabbitmq:/etc/ssl/server_certificate.pem
    docker container start rabbitmq
fi