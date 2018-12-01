eval $(docker-machine env rabbitmq-production)
docker service logs amp-production-backend_rabbitmq --tail 500 --follow