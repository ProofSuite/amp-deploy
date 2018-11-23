eval $(docker-machine env client-production)

docker run --rm \  
  -p 443:443 -p 80:80 --name letsencrypt \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  certbot/certbot certonly -n \
  -m "david@proofsuite.com" \
  -d amp.exchange.com \
  --standalone --agree-tos

eval $(docker-machine env mongodb-production)

docker run --rm \  
  -p 443:443 -p 80:80 --name letsencrypt \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  certbot/certbot certonly -n \
  -m "david@proofsuite.com" \
  -d amp.exchange.com \
  --standalone --agree-tos

eval $(docker-machine env rabbitmq-production)

docker run --rm \  
  -p 443:443 -p 80:80 --name letsencrypt \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  certbot/certbot certonly -n \
  -m "david@proofsuite.com" \
  -d amp.exchange.com \
  --standalone --agree-tos

eval $(docker-machine env matching-engine-production)

docker run --rm \  
  -p 443:443 -p 80:80 --name letsencrypt \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  certbot/certbot certonly -n \
  -m "david@proofsuite.com" \
  -d amp.exchange.com \
  --standalone --agree-tos