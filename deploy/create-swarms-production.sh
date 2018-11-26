eval $(docker-machine env client-production)
docker swarm init --advertise-addr $(docker-machine ip client-production)

frontend_manager_token=$(docker swarm join-token manager --quiet)
frontend_worker_token=$(docker swarm join-token worker --quiet)

docker network create --driver overlay --attachable amp-production-frontend

eval $(docker-machine env matching-engine-production)
docker swarm init --advertise-addr $(docker-machine ip matching-engine-production)

backend_manager_token=$(docker swarm join-token manager --quiet)
backend_worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip matching-engine-production)

eval $(docker-machine env rabbitmq-production)
docker swarm join --token $backend_manager_token $(docker-machine ip matching-engine-production):2377 --advertise-addr $(docker-machine ip rabbitmq-production)

docker network create --driver overlay --subnet 172.20.0.0/16 --attachable amp-production-backend





