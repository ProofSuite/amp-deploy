eval $(docker-machine env client)
docker swarm init --advertise-addr $(docker-machine ip client)

frontend_manager_token=$(docker swarm join-token manager --quiet)
frontend_worker_token=$(docker swarm join-token worker --quiet)

docker network create --driver overlay --attachable amp-staging-frontend

eval $(docker-machine env matching-engine)
docker swarm init --advertise-addr $(docker-machine ip matching-engine)

backend_manager_token=$(docker swarm join-token manager --quiet)
backend_worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip matching-engine)

eval $(docker-machine env rabbitmq)
docker swarm join --token $backend_manager_token $(docker-machine ip matching-engine):2377 --advertise-addr $(docker-machine ip rabbitmq)

docker network create --driver overlay --attachable amp-staging-frontend
docker network create --driver overlay --attachable amp-staging-backend





