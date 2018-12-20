eval $(docker-machine env client)
docker service logs amp-staging-frontend_client --tail 500 --follow