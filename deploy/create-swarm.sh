eval $(docker-machine env client)
docker swarm init --advertise-addr $(docker-machine ip client)

manager_token=$(docker swarm join-token manager --quiet)
worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip client)

eval $(docker-machine env matching-engine)
docker swarm join --token $manager_token $(docker-machine ip client):2377

eval $(docker-machine env rabbitmq)
docker swarm join --token $manager_token $(docker-machine ip client):2377

eval $(docker-machine env redis)
docker swarm join --token $manager_token $(docker-machine ip client):2377

eval $(docker-machine env mongodb)
docker swarm join --token $manager_token $(docker-machine ip client):2377

eval $(docker-machine env ethereum)
docker swarm join --token $manager_token $(docker-machine ip client):2377

docker network create --driver overlay --attachable amp