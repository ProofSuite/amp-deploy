eval $(docker-machine env matching-engine-production)
docker service logs amp-production-backend_matching-engine --tail 500 --follow