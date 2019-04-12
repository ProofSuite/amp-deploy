eval $(docker-machine env client-prod)

docker run --rm \
  -p 443:443 -p 80:80 --name letsencrypt \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  certbot/certbot certonly -n \
  -m "david@proofsuite.com" \
  -d amp.exchange \
  --standalone --agree-tos