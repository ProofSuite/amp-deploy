eval $(docker-machine env client-prod)
docker service logs amp-prod-frontend_client --tail 500 --follow