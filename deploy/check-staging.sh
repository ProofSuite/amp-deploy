echo "\nFrontend Status"
eval $(docker-machine env client)
docker stack ps amp-staging-frontend

echo "\nBackend Status"
eval $(docker-machine env matching-engine)
docker stack ps amp-staging-backend