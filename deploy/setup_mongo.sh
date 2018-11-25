#!/bin/bash
AMP_PRODUCTION_RABBITMQ_USERNAME=${AMP_PRODUCTION_RABBITMQ_USERNAME}
AMP_PRODUCTION_RABBITMQ_PASSWORD=${AMP_PRODUCTION_RABBITMQ_PASSWORD}
AMP_PRODUCTION_MONGODB_USERNAME=${AMP_PRODUCTION_MONGODB_USERNAME}
AMP_PRODUCTION_MONGODB_PASSWORD=${AMP_PRODUCTION_MONGODB_PASSWORD}



mongod --dbpath /data/db --nojournal
while ! nc -vz localhost 27017; do sleep 1; done

echo "Creating mongodb user:"
echo -e "Username: ${AMP_PRODUCTION_MONGOB_USERNAME}"
echo -e "Password: ${AMP_PRODUCTION_MONGODB_PASSWORD}"
mongo proofdex --eval "db.createUser({ user: 'AMP_PRODUCTION_MONGODB_USERNAME', pwd: 'AMP_PRODUCTION_MONGODB_PASSWORD', roles: [ { role: dbAdminAnyDatabase, db: proofdex } ] });"

mongod --dbpath /data/db --shutdown