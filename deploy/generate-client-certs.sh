sudo docker run -it --rm -p 443:443 -p 80:80 --name certbot \
-v client_certificates:/etc/letsencrypt \
-v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
quay.io/letsencrypt/letsencrypt:latest certonly