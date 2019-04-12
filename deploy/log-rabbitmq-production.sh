eval $(docker-machine env rabbitmq-prod)
docker service logs amp-prod-backend_rabbitmq --tail 500 --follow