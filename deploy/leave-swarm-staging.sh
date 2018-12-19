eval $(docker-machine env client)
docker swarm leave --force

eval $(docker-machine env matching-engine)
docker swarm leave --force

eval $(docker-machine env mongodb)
docker swarm leave --force

eval $(docker-machine env rabbitmq)
docker swarm leave --force

docker network rm amp-staging-frontend
docker network rm amp-staging-backend