# Create docker machines
docker-machine create --driver amazonec2 \
  --amazonec2-open-port 5672 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.micro" \
  --amazonec2-region ap-northeast-2 \
  rabbitmq-prod

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 80 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.micro" \
  --amazonec2-region ap-northeast-2 \
  client-prod

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 8081 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-instance-type="t2.medium" \
  --amazonec2-region ap-northeast-2 \
  matching-engine-prod

# Create one manager node for each element
eval $(docker-machine env client-prod)
docker swarm init --advertise-addr $(docker-machine ip client-prod)

manager_token=$(docker swarm join-token manager --quiet)
worker_token=$(docker swarm join-token worker --quiet)

eval $(docker-machine env -u)
ip=$(docker-machine ip client-prod)

eval $(docker-machine env matching-engine-prod)
docker swarm join --token $manager_token $(docker-machine ip client-prod):2377

eval $(docker-machine env rabbitmq-prod)
docker swarm join --token $manager_token $(docker-machine ip client-prod):2377

docker network create --driver overlay --attachable amp-prod-frontend
docker network create --driver overlay --attachable amp-prod-backend
docker-machine ssh rabbitmq-prod mkdir etc
docker-machine ssh client-prod mkdir etc
docker-machine ssh matching-engine-prod mkdir etc
docker-machine ssh rabbitmq-prod mkdir etc/ssl
docker-machine ssh client-prod mkdir etc/ssl
docker-machine ssh client-prod mkdir /etc/letsencrypt
docker-machine ssh matching-engine-prod mkdir etc/ssl
docker-machine ssh matching-engine-prod mkdir etc/letsencrypt/live
docker-machine ssh matching-engine-prod sudo chmod 755 /etc/letsencrypt/live
docker-machine ssh matching-engine-prod mkdir -p etc/letsencrypt/amp.exchange

AMP_PRODUCTION_RABBITMQ_USERNAME=${AMP_PRODUCTION_RABBITMQ_USERNAME}
AMP_PRODUCTION_RABBITMQ_PASSWORD=${AMP_PRODUCTION_RABBITMQ_PASSWORD}
AMP_PRODUCTION_MONGODB_USERNAME=${AMP_PRODUCTION_MONGODB_USERNAME}
AMP_PRODUCTION_MONGODB_PASSWORD=${AMP_PRODUCTION_MONGODB_PASSWORD}













