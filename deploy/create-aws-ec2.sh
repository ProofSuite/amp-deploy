# Create docker machines
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