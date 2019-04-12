echo "\nFrontend Status"
eval $(docker-machine env client-prod)
docker stack ps amp-prod-frontend

echo "\nBackend Status"
eval $(docker-machine env matching-engine-prod)
docker stack ps amp-prod-backend