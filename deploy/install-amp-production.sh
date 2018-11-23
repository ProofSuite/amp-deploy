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
 mongodb-production

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 5672 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.micro" \
  --amazonec2-region ap-northeast-2 \
  rabbitmq-production

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 80 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.micro" \
  --amazonec2-region ap-northeast-2 \
  client-production

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 8081 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.medium" \
  --amazonec2-region ap-northeast-2 \
  matching-engine-production

# Create one manager node for each element
eval $(docker-machine env client-production)
docker swarm init --advertise-addr $(docker-machine ip client-production)

manager_token=$(docker swarm join-token manager --quiet)
worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip client-production)

eval $(docker-machine env matching-engine-production)
docker swarm join --token $manager_token $(docker-machine ip client-production):2377

eval $(docker-machine env rabbitmq-production)
docker swarm join --token $manager_token $(docker-machine ip client-production):2377

eval $(docker-machine env mongodb-production)
docker swarm join --token $manager_token $(docker-machine ip client-production):2377

docker network create --driver overlay --attachable amp-production