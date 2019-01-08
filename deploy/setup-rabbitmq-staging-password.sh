eval $(docker-machine env rabbitmq)

docker container exec -it $(docker ps -q) rabbitmqctl add_user root ${AMP_STAGING_RABBITMQ_PASSWORD}
docker container exec -it $(docker ps -q) rabbitmqctl set_user_tags root administrator
docker container exec -it $(docker ps -q) rabbitmqctl set_permissions root ".*" ".*" ".*"
