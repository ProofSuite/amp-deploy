eval $(docker-machine env client-production)
docker swarm leave --force

eval $(docker-machine env matching-engine-production)
docker swarm leave --force

eval $(docker-machine env rabbitmq-production)
docker swarm leave --force

docker network rm amp-production-frontend
docker network rm amp-production-backend