git clone https://github.com/michaelklishin/tls-gen tls-gen

cd tls-gen/basic

make PASSWORD=shit
cp -rf result/* ${AMP_CERTS_PATH}/rabbitmq/

make PASSWORD=shit
cp -rf result/* ${AMP_CERTS_PATH}/mongodb/

make PASSWORD=shit
cp -rf result/* ${AMP_CERTS_PATH}/matching-engine/

make PASSWORD=shit
cp -rf result/* ${AMP_CERTS_PATH}/client/


cat ${AMP_CERTS_PATH}/rabbitmq/server_certificate.pem ${AMP_CERTS_PATH}/rabbitmq/server_key.pem > ${AMP_CERTS_PATH}/rabbitmq/server_full_key.pem
cat ${AMP_CERTS_PATH}/mongodb/server_certificate.pem ${AMP_CERTS_PATH}/mongodb/server_key.pem > ${AMP_CERTS_PATH}/mongodb/server_full_key.pem
cat ${AMP_CERTS_PATH}/client/server_certificate.pem ${AMP_CERTS_PATH}/client/server_key.pem > ${AMP_CERTS_PATH}/client/server_full_key.pem
cat ${AMP_CERTS_PATH}/matching-engine/server_certificate.pem ${AMP_CERTS_PATH}/matching-engine/server_key.pem > ${AMP_CERTS_PATH}/matching-engine/server_full_key.pem
cat ${AMP_CERTS_PATH}/rabbitmq/client_certificate.pem ${AMP_CERTS_PATH}/rabbitmq/client_key.pem > ${AMP_CERTS_PATH}/rabbitmq/client_full_key.pem
cat ${AMP_CERTS_PATH}/mongodb/client_certificate.pem ${AMP_CERTS_PATH}/mongodb/client_key.pem > ${AMP_CERTS_PATH}/mongodb/client_full_key.pem
cat ${AMP_CERTS_PATH}/client/client_certificate.pem ${AMP_CERTS_PATH}/client/client_key.pem > ${AMP_CERTS_PATH}/client/client_full_key.pem
cat ${AMP_CERTS_PATH}/matching-engine/client_certificate.pem ${AMP_CERTS_PATH}/matching-engine/client_key.pem > ${AMP_CERTS_PATH}/matching-engine/client_full_key.pem

cd ..
cd ..
rm -rf tls-gen



# openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out amp_matching-engine.crt -keyout amp_matching-engine.key
# openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out amp_mongodb.crt -keyout amp_mongodb.key
# openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out amp_rabbitmq.crt -keyout amp_rabbitmq.key
# openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out amp_client.crt -keyout amp_client.key
# cat amp_matching-engine.key amp_matching-engine.crt > amp_matching-engine.pem
# cat amp_client.key amp_client.crt > amp_client.pem
# cat amp_rabbitmq.key amp_rabbitmq.crt > amp_rabbitmq.pem
# cat amp_mongodb.key amp_mongodb.crt > amp_mongodb.pem