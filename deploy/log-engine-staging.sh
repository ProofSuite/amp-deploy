eval $(docker-machine env matching-engine)
docker service logs amp-staging-backend_matching-engine --tail 500 --follow