eval $(docker-machine env client-staging)
docker swarm init --advertise-addr $(docker-machine ip client-staging)

manager_token=$(docker swarm join-token manager --quiet)
worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip client-staging)

eval $(docker-machine env matching-engine-staging)
docker swarm join --token $manager_token $(docker-machine ip client-staging):2377

eval $(docker-machine env rabbitmq-staging)
docker swarm join --token $manager_token $(docker-machine ip client-staging):2377

eval $(docker-machine env mongodb-staging)
docker swarm join --token $manager_token $(docker-machine ip client-staging):2377

docker network create --driver overlay --subnet 172.20.0.0/16 --attachable amp-staging