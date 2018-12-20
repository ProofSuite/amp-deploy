eval $(docker-machine env matching-engine-production)
docker stack rm amp-production-backend

eval $(docker-machine env client-production)
docker stack rm amp-production-frontend