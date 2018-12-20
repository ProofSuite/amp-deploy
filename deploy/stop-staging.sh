eval $(docker-machine env matching-engine)
docker stack rm amp-staging-backend

eval $(docker-machine env client)
docker stack rm amp-staging-frontend