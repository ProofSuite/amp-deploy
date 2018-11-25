eval $(docker-machine env client-production)
docker swarm init --advertise-addr $(docker-machine ip client-production)

production_manager_token=$(docker swarm join-token manager --quiet)
production_worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip client-production)

eval $(docker-machine env matching-engine-production)
docker swarm join --token $production_manager_token $(docker-machine ip client-production):2377

eval $(docker-machine env rabbitmq-production)
docker swarm join --token $production_manager_token $(docker-machine ip client-production):2377

docker network create --driver overlay --subnet 172.20.0.0/16 --attachable amp-production