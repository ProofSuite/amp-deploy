#!/bin/bash

if [[ $(which ttab) == "ttab not found" ]]; then
  echo "ttab is missing"
fi

if [[ $(which mongo) == "mongo not found" ]]; then
  echo "mongo is missing"
fi

if [[ $(which rabbitmqadmin) == "rabbitmqadmin not found" ]]; then
  echo "rabbitmqadmin is missing"
fi

MONGODB_URL='mongodb://'$(docker-machine ip mongodb)':27017';
RABBITMQ_URL='ampq://guest:guest@'$(docker-machine ip rabbitmq)':5672';
AMP_ENVIRONMENT='staging'


show_menu(){
    NORMAL=`echo "\033[m"`
    MENU=`echo "\033[36m"` #Blue
    NUMBER=`echo "\033[33m"` #yellow
    FGRED=`echo "\033[41m"`
    RED_TEXT=`echo "\033[31m"`
    ENTER_LINE=`echo "\033[33m"`
    echo -e "${MENU}*********************************************${NORMAL}"
    echo -e "${MENU}${NUMBER} 1)${MENU} MongoDB ${NORMAL}"
    echo -e "${MENU}${NUMBER} 2)${MENU} MongoDB (query) ${NORMAL}"
    echo -e "${MENU}${NUMBER} 3)${MENU} RabbitMQ ${NORMAL}"
    echo -e "${MENU}${NUMBER} 4)${MENU} Engine ${NORMAL}"
    echo -e "${MENU}${NUMBER} 5)${MENU} Contracts ${NORMAL}"
    echo -e "${MENU}*********************************************${NORMAL}"
    read opt

  while [ opt != '' ]
  do
    if [[ $opt = "" ]]; then
      exit;
    else
      case $opt in
      1) clear;
      write_header "MongoDB Menu";
      show_mongo_menu
      ;;

      2) clear;
      write_header "Inspect MongoDB Menu";
      show_inspect_mongo_menu
      ;;

      3) clear;
      write_header "RabbitMQ Menu";
      show_rabbitmq_menu
      ;;

      4) clear;
      write_header "Engine Menu";
      show_engine_menu;
      ;;

      5) clear;
      write_header "Contracts Menu";
      show_contracts_menu;
      ;;

      x)exit;
      ;;

      \n)exit;
      ;;

      *)clear;
      write_header "Choose option";
      show_menu;
      ;;
      esac
    fi
  done
}


show_mongo_menu(){
    NORMAL=`echo "\033[m"`
    MENU=`echo "\033[36m"` #Blue
    NUMBER=`echo "\033[33m"` #yellow
    FGRED=`echo "\033[41m"`
    RED_TEXT=`echo "\033[31m"`
    ENTER_LINE=`echo "\033[33m"`
    echo -e "${MENU}*********************************************${NORMAL}"
    echo -e "${MENU}${NUMBER} 1)${MENU} Drop DB ${NORMAL}"
    echo -e "${MENU}${NUMBER} 2)${MENU} Drop Pairs ${NORMAL}"
    echo -e "${MENU}${NUMBER} 3)${MENU} Drop Tokens ${NORMAL}"
    echo -e "${MENU}${NUMBER} 4)${MENU} Drop Accounts ${NORMAL}"
    echo -e "${MENU}${NUMBER} 5)${MENU} Drop Wallets ${NORMAL}"
    echo -e "${MENU}${NUMBER} 6)${MENU} Drop Orders ${NORMAL}"
    echo -e "${MENU}${NUMBER} 7)${MENU} Drop Trades ${NORMAL}"
    echo -e "${MENU}${NUMBER} 8)${MENU} Seed Tokens ${NORMAL}"
    echo -e "${MENU}${NUMBER} 9)${MENU} Seed Pairs ${NORMAL}"
    echo -e "${MENU}${NUMBER} 10)${MENU} Seed Wallets ${NORMAL}"
    echo -e "${MENU}${NUMBER} 11)${MENU} Seed Random Orders ${NORMAL}"
    echo -e "${MENU}${NUMBER} 12)${MENU} Seed Random Trades ${NORMAL}"
    echo -e "${MENU}${NUMBER} 13)${MENU} Seed Rinkeby MongoDB Test Environment ${NORMAL}"
    echo -e "${MENU}${NUMBER} 14)${MENU} Back ${NORMAL}"
    echo -e "${MENU}*********************************************${NORMAL}"
    read opt

  while [ opt != '' ]
  do
    if [[ $opt = "" ]]; then
      exit;
    else
      case $opt in
      1) clear;
      write "Dropping Database";
      node ../db/drop_db --mongo_url $MONGODB_URL;
      write 'Done\n';
      show_mongo_menu;
      ;;

      2) clear;
      write "Dropping Pairs";
      node ../db/drop_collection --mongo_url $MONGODB_URL --collection pairs;
      write 'Done\n';
      show_mongo_menu;
      ;;

      3) clear;
      write "Dropping Tokens";
      node ../db/drop_collection --mongo_url $MONGODB_URL --collection tokens;
      write 'Done\n';
      show_mongo_menu;
      ;;

      4) clear;
      write "Dropping Account";
      node ../db/drop_collection --mongo_url $MONGODB_URL --collections accounts;
      write_header "Dropped Accounts";
      show_mongo_menu;
      ;;

      5) clear;
      write 'Dropping wallets ';
      node ../db/drop_collection --mongo_url $MONGODB_URL --collection wallets;
      write 'Done\n';
      show_mongo_menu;
      ;;

      6) clear;
      write 'Dropping orders collection...';
      node ../db/drop_collection --mongo_url $MONGODB_URL --collection orders;
      write 'Done\n';
      show_mongo_menu;
      ;;

      7) clear;
      write 'Dropping trades collection...'
      node ../db/drop_collection --mongo_url $MONGODB_URL --collection trades;
      write 'Done\n';
      show_mongo_menu;
      ;;

      8) clear;
      write 'Seed tokens...';
      node ../db/seed_tokens --mongo_url $MONGODB_URL --network rinkeby;
      node ../db/seed_quotes --mongo_url $MONGODB_URL --network rinkeby;
      write 'Done\n';
      show_mongo_menu;
      ;;

      9) clear;
      write 'Seeding pairs...';
      node ../db/seed_pairs --mongo_url $MONGODB_URL;
      write 'Done\n';
      show_mongo_menu;
      ;;

      10) clear;
      write 'Seeding wallets...';
      node ../db/seed_wallets --mongo_url $MONGO_URL --network rinkeby;
      write 'Done\n';
      show_mongo_menu;
      ;;

      11) clear;
      write 'Seeding orders';
      node ../db/seed_orders --mongo_url $MONGODB_URL;
      write 'Done\n';
      show_mongo_menu;
      ;;

      12) clear;
      write 'Seeding trades';
      node ../db/seed_trades --mongo_url $MONGODB_URL;
      write 'Done\n';
      show_mongo_menu;
      ;;

      13) clear;
      write 'Seeding tokens ...';
      node ../db/seed_tokens --mongo_url $MONGODB_URL --network rinkeby;
      node ../db/seed_quotes --mongo_url $MONGODB_URL --network rinkeby;
      write 'Seeding pairs ...';
      node ../db/seed_pairs --mongo_url $MONGODB_URL;
      write 'Seeding wallets ...';
      node ../db/seed_wallets --mongo_url $MONGODB_URL --network rinkeby;
      write 'Done\n'
      show_mongo_menu;
      ;;

      14) clear;
      show_menu;
      ;;

      x) exit;
      ;;

      \n) exit;
      ;;

      *)clear;
      write_header "Choose option"
      show_mongo_menu;
      ;;

      esac
    fi
  done
}

show_inspect_mongo_menu(){
  NORMAL=`echo "\033[m"`
  MENU=`echo "\033[36m"` #Blue
  NUMBER=`echo "\033[33m"` #yellow
  FGRED=`echo "\033[41m"`
  RED_TEXT=`echo "\033[31m"`
  ENTER_LINE=`echo "\033[33m"`
  echo -e "${MENU}*********************************************${NORMAL}"
  echo -e "${MENU}${NUMBER} 1)${MENU} Query Tokens ${NORMAL}"
  echo -e "${MENU}${NUMBER} 2)${MENU} Query Pairs ${NORMAL}"
  echo -e "${MENU}${NUMBER} 3)${MENU} Query Orders  ${NORMAL}"
  echo -e "${MENU}${NUMBER} 4)${MENU} Query Trades ${NORMAL}"
  echo -e "${MENU}${NUMBER} 5)${MENU} Back ${NORMAL}"
  echo -e "${MENU}*********************************************${NORMAL}"
  read opt

  while [ opt != '' ]
  do
    if [[ $opt = "" ]]; then
      exit;
    else
      case $opt in
      1) clear;
      node ../db/query_collection --mongo_url $MONGODB_URL --collection "tokens" | less;
      show_inspect_mongo_menu;
      ;;

      2) clear;
      node ../db/query_collection --mongo_url $MONGODB_URL --collection "pairs" | less;
      show_inspect_mongo_menu;
      ;;

      3) clear;
      node ../db/query_collection --mongo_url $MONGODB_URL --collection "orders" | less;
      show_inspect_mongo_menu;
      ;;

      4) clear;
      node ../db/query_collection --mongo_url $MONGODB_URL --collection "trades" | less;
      show_inspect_mongo_menu;
      ;;

      5) clear;
      show_menu;
      ;;

      x) exit;
      ;;

      \n) exit;
      ;;

      *)clear;
      write_header "Choose an option"
      show_mongo_menu;
      ;;

      esac
    fi
  done
}


show_engine_menu(){
  NORMAL=`echo "\033[m"`
  MENU=`echo "\033[36m"` #Blue
  NUMBER=`echo "\033[33m"` #yellow
  FGRED=`echo "\033[41m"`
  RED_TEXT=`echo "\033[31m"`
  ENTER_LINE=`echo "\033[33m"`
  echo -e "${MENU}*********************************************${NORMAL}"
  echo -e "${MENU}${NUMBER} 1)${MENU} Monitor logs ${NORMAL}"
  echo -e "${MENU}${NUMBER} 2)${MENU} Clear logs ${NORMAL}"
  echo -e "${MENU}${NUMBER} 3)${MENU} Back ${NORMAL}"
  echo -e "${MENU}*********************************************${NORMAL}"
  read opt

  while [ opt != '' ]
  do
    if [[ $opt = "" ]]; then
      exit;
    else
      case $opt in
      1) clear;
      ttab 'cd $AMPENGINE/logs && multitail api.log engine.log main.log operator.log rabbit.log'
      show_rabbitmq_menu;
      ;;

      2) clear;
      cd $AMPENGINE/logs
      truncate -s0 api.log && truncate -s0 engine.log && truncate -s0 main.log && truncate -s0 operator.log && truncate -s0 rabbit.log;
      write 'Done\n';
      ;;

      3) clear;
      show_menu;
      ;;

      x) exit;
      ;;

      \n) exit;
      ;;

      *)clear;
      write "Choose option"
      show_rabbitmq_menu;
      ;;

      esac
    fi
  done
}


show_rabbitmq_menu(){
  NORMAL=`echo "\033[m"`
  MENU=`echo "\033[36m"` #Blue
  NUMBER=`echo "\033[33m"` #yellow
  FGRED=`echo "\033[41m"`
  RED_TEXT=`echo "\033[31m"`
  ENTER_LINE=`echo "\033[33m"`
  echo -e "${MENU}*********************************************${NORMAL}"
  echo -e "${MENU}${NUMBER} 1)${MENU} List users ${NORMAL}"
  echo -e "${MENU}${NUMBER} 2)${MENU} List queues ${NORMAL}"
  echo -e "${MENU}${NUMBER} 3)${MENU} List connections  ${NORMAL}"
  echo -e "${MENU}${NUMBER} 4)${MENU} List channels ${NORMAL}"
  echo -e "${MENU}${NUMBER} 5)${MENU} Show logs ${NORMAL}"
  echo -e "${MENU}${NUMBER} 5)${MENU} Report ${NORMAL}"
  echo -e "${MENU}${NUMBER} 6)${MENU} Back ${NORMAL}"
  echo -e "${MENU}*********************************************${NORMAL}"
  read opt

  while [ opt != '' ]
  do
    if [[ $opt = "" ]]; then
      exit;
    else
      case $opt in
      1) clear;
      eval $(docker-machine env rabbitmq)
      docker container exec -it $(docker container ls -q) rabbitmqctl list_users
      show_rabbitmq_menu;
      ;;

      2) clear;
      eval $(docker-machine env rabbitmq)
      docker container exec -it $(docker container ls -q) rabbitmqctl list_queues
      show_rabbitmq_menu;
      ;;

      3) clear;
      eval $(docker-machine env rabbitmq)
      docker container exec -it $(docker container ls -q) rabbitmqctl list_connections
      show_rabbitmq_menu;
      ;;

      4) clear;
      eval $(docker-machine env rabbitmq)
      docker container exec -it $(docker container ls -q) rabbitmqctl list_channels
      show_rabbitmq_menu;
      ;;

      5) clear;
      eval $(docker-machine env rabbitmq)
      docker container exec -it $(docker container ls -q) 'cat /usr/local/var/log/rabbitmq/rabbit@localhost.log'
      show_rabbitmq_menu;
      ;;

      6) clear;
      eval $(docker-machine env rabbitmq)
      docker container exec -it $(docker container ls -q) rabbitmqctl report
      ;;

      7) clear;
      show_menu;
      ;;

      x) exit;
      ;;

      \n) exit;
      ;;

      *)clear;
      write_header "Choose option"
      show_rabbitmq_menu;
      ;;

      esac
    fi
  done
}

show_contracts_menu(){
  NORMAL=`echo "\033[m"`
  MENU=`echo "\033[36m"` #Blue
  NUMBER=`echo "\033[33m"` #yellow
  FGRED=`echo "\033[41m"`
  RED_TEXT=`echo "\033[31m"`
  ENTER_LINE=`echo "\033[33m"`
  echo -e "${MENU}*********************************************${NORMAL}"
  echo -e "${MENU}${NUMBER} 1)${MENU} Update contract addresses ${NORMAL}"
  echo -e "${MENU}${NUMBER} 2)${MENU} Show rinkeby contract addresses ${NORMAL}"
  echo -e "${MENU}${NUMBER} 3)${MENU} Register Rinkeby Pairs ${NORMAL}"
  echo -e "${MENU}${NUMBER} 4)${MENU} Register Rinkeby Reward Tokens ${NORMAL}"
  echo -e "${MENU}${NUMBER} 5)${MENU} Register Rinkeby Operators ${NORMAL}"
  echo -e "${MENU}${NUMBER} 6)${MENU} Show Rinkeby Operator Balances ${NORMAL}"
  echo -e "${MENU}${NUMBER} 7)${MENU} Show Rinkeby Contract Setup ${NORMAL}"
  echo -e "${MENU}${NUMBER} 8)${MENU} Back ${NORMAL}"
  echo -e "${MENU}*********************************************${NORMAL}"
  read opt

  while [ opt != '' ]
  do
    if [[ $opt = "" ]]; then
      exit;
    else
      case $opt in
      1) clear;
      node ${AMPDB}/scripts/update_contract_addresses
      write "Contract addresses updated."
      show_contracts_menu;
      ;;

      2) clear;
      node ${AMPDB}/scripts/show_contract_addresses --network rinkeby
      show_contracts_menu;
      ;;

      3) clear;
      node ${AMPDB}/scripts/register_pairs --network rinkeby
      show_contracts_menu;
      ;;

      4) clear;
      node ${AMPDB}/scripts/register_reward_tokens --network rinkeby
      show_contracts_menu;
      ;;

      5) clear;
      node ${AMPDB}/scripts/register_operators --network rinkeby
      show_contracts_menu;
      ;;

      6) clear;
      node ${AMPDB}/scripts/show_operator_balances --network rinkeby
      show_contracts_menu;
      ;;

      7) clear;
      node ${AMPDB}/scripts/show_contract_setup --network rinkeby --mongo_url ${MONGODB_URL}
      show_contracts_menu;
      ;;

      8) clear;
      show_menu;
      ;;

      x) exit;
      ;;

      \n) exit;
      ;;

      *)clear;
      write_header "Choose option"
      show_contracts_menu;
      ;;

      esac
    fi
  done
}


write(){
  COLOR='\033[01;31m' # bold red
  RESET='\033[00;00m' # normal white
  echo -e ${COLOR}$1${RESET}
}

write_header(){
  COLOR='\033[01;31m' # bold red
  RESET='\033[00;00m' # normal white
  echo -e ${COLOR}$1${RESET}
}

clear
show_menu