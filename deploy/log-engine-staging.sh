eval $(docker-machine env matching-engine)
docker service logs amp_matching-engine --tail 500 --follow