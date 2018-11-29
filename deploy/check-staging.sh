echo "\nStaging build Status"
eval $(docker-machine env client)
docker stack ps amp