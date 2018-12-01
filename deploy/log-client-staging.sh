eval $(docker-machine env client)
docker service logs amp-client --tail 500 --follow