if [ ! "$(docker ps -q -f name=rabbitmq)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=rabbitmq)" ]; then
        docker rm rabbitmq
    fi

    docker create --name rabbitmq rabbitmq
    docker cp ./rabbitmq-production.conf rabbitmq:/etc/rabbitmq/rabbitmq.conf
fi