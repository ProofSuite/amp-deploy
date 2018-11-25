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

docker-machine ssh rabbitmq-production mkdir etc
docker-machine ssh client-production mkdir etc
docker-machine ssh mongodb-production mkdir etc
docker-machine ssh matching-engine-production mkdir etc
docker-machine ssh rabbitmq-production mkdir etc/ssl
docker-machine ssh client-production mkdir etc/ssl
docker-machine ssh mongodb-production mkdir etc/ssl
docker-machine ssh matching-engine-production mkdir etc/ssl

docker-machine ssh matching-engine-production sudo chmod 755 /etc/letsencrypt/live
docker-machine ssh matching-engine-production mkdir -p etc/letsencrypt/amp.exchange

AMP_PRODUCTION_RABBITMQ_USERNAME=${AMP_PRODUCTION_RABBITMQ_USERNAME}
AMP_PRODUCTION_RABBITMQ_PASSWORD=${AMP_PRODUCTION_RABBITMQ_PASSWORD}
AMP_PRODUCTION_MONGODB_USERNAME=${AMP_PRODUCTION_MONGODB_USERNAME}
AMP_PRODUCTION_MONGODB_PASSWORD=${AMP_PRODUCTION_MONGODB_PASSWORD}



# mongod --dbpath /data/db --nojournal
# while ! nc -vz localhost 27017; do sleep 1; done

# echo "Creating mongodb user:"
# echo -e "Username: ${AMP_PRODUCTION_MONGOB_USERNAME}"
# echo -e "Password: ${AMP_PRODUCTION_MONGODB_PASSWORD}"
# mongo proofdex --eval "db.createUser({ user: 'AMP_PRODUCTION_MONGODB_USERNAME', pwd: 'AMP_PRODUCTION_MONGODB_PASSWORD', roles: [ { role: dbAdminAnyDatabase, db: proofdex } ] });"

# mongod --dbpath /data/db --shutdown













