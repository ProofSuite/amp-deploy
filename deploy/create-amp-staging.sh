# Create docker machines
docker-machine create --driver amazonec2 \
 --amazonec2-open-port 27017 \
 --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.medium" \
 --amazonec2-region ap-northeast-2 \
 mongodb-staging

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 5672 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.micro" \
  --amazonec2-region ap-northeast-2 \
  rabbitmq-staging

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 80 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.micro" \
  --amazonec2-region ap-northeast-2 \
  client-staging

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 8081 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.medium" \
  --amazonec2-region ap-northeast-2 \
  matching-engine-staging

# Create one manager node for each element
eval $(docker-machine env client-staging)
docker swarm init --advertise-addr $(docker-machine ip client-staging)

manager_token=$(docker swarm join-token manager --quiet)
worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip client-staging)

eval $(docker-machine env matching-engine-staging)
docker swarm join --token $manager_token $(docker-machine ip client-staging):2377

eval $(docker-machine env rabbitmq)
docker swarm join --token $manager_token $(docker-machine ip client-staging):2377

eval $(docker-machine env mongodb)
docker swarm join --token $manager_token $(docker-machine ip client-staging):2377

docker network create --driver overlay --attachable amp-staging-backend
docker network create --driver overlay --attachable amp-staging-frontend