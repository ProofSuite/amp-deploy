# Create docker machines
docker-machine create --driver amazonec2 \
 --amazonec2-open-port 27017 \
 --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-region ap-northeast-2 \
 mongodb

docker-machine create --driver amazonec2 \
 --amazonec2-open-port 6379 \
 --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
 --amazonec2-region ap-northeast-2 \
 redis

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 5672 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
  --amazonec2-region ap-northeast-2 \
  rabbitmq

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 80 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
  --amazonec2-region ap-northeast-2 \
  client

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 8081 \
  --amazonec2-open-port 2377/tcp \
 --amazonec2-open-port 7946/tcp \
 --amazonec2-open-port 7946/udp \
 --amazonec2-open-port 4789/tcp \
 --amazonec2-open-port 4789/udp \
  --amazonec2-region ap-northeast-2 \
  matching-engine

docker-machine create --driver amazonec2 \
  --amazonec2-open-port 2377/tcp \
  --amazonec2-open-port 7946/tcp \
  --amazonec2-open-port 7946/udp \
  --amazonec2-open-port 4789/tcp \
  --amazonec2-open-port 4789/udp \
  --amazonec2-open-port 8545 \
  --amazonec2-open-port 8546 \
  --amazonec2-open-port 30303 \
  --amazonec2-region ap-northeast-2 \
  ethereum