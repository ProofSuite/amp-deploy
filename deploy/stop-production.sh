eval $(docker-machine env matching-engine-prod)
docker stack rm amp-prod-backend

eval $(docker-machine env client-prod)
docker stack rm amp-prod-frontend