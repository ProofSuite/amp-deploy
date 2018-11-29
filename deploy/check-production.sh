
echo "\nFrontend Status"
eval $(docker-machine env client-production)
docker stack ps amp-production-frontend

echo "\nBackend Status"
eval $(docker-machine env matching-engine-production)
docker stack ps amp-production-backend