eval $(docker-machine env client-prod)
docker swarm leave --force

eval $(docker-machine env matching-engine-prod)
docker swarm leave --force

eval $(docker-machine env rabbitmq-prod)
docker swarm leave --force

docker network rm amp-prod-frontend
docker network rm amp-prod-backend