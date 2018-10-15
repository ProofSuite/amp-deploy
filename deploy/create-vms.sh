docker-machine create --driver virtualbox mongodb
docker-machine create --driver virtualbox redis
docker-machine create --driver virtualbox rabbitmq
docker-machine create --driver virtualbox client
docker-machine create --driver virtualbox matching-engine
docker-machine create --driver virtualbox ethereum

# docker-machine ssh ethereum 'mkdir root; mkdir root/.ethereum;'