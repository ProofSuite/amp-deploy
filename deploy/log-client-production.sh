eval $(docker-machine env client-production)
docker service logs amp-production-frontend_client --tail 500 --follow