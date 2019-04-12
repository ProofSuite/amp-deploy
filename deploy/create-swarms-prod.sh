eval $(docker-machine env client-prod)
docker swarm init --advertise-addr $(docker-machine ip client-prod)

frontend_manager_token=$(docker swarm join-token manager --quiet)
frontend_worker_token=$(docker swarm join-token worker --quiet)

docker network create --driver overlay --attachable amp-prod-frontend

eval $(docker-machine env matching-engine-prod)
docker swarm init --advertise-addr $(docker-machine ip matching-engine-prod)

backend_manager_token=$(docker swarm join-token manager --quiet)
backend_worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip matching-engine-prod)

eval $(docker-machine env rabbitmq-prod)
docker swarm join --token $backend_manager_token $(docker-machine ip matching-engine-prod):2377 --advertise-addr $(docker-machine ip rabbitmq-prod)

docker network create --driver overlay --subnet 172.20.0.0/16 --attachable amp-prod-backend





