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
    echo -e "${MENU}${NUMBER} 3)${MENU} Redis ${NORMAL}"
    echo -e "${MENU}${NUMBER} 4)${MENU} RabbitMQ ${NORMAL}"
    echo -e "${MENU}${NUMBER} 5)${MENU} Engine ${NORMAL}"
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
      write_header "Redis Menu";
      show_redis_menu
      ;;

      4) clear;
      write_header "RabbitMQ Menu";
      show_rabbitmq_menu
      ;;

      5) clear;
      write_header "Engine Menu";
      show_engine_menu;
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
    echo -e "${MENU}${NUMBER} 10)${MENU} Seed Accounts ${NORMAL}"
    echo -e "${MENU}${NUMBER} 11)${MENU} Seed Wallets ${NORMAL}"
    echo -e "${MENU}${NUMBER} 12)${MENU} Seed Random Orders and Trades ${NORMAL}"
    echo -e "${MENU}${NUMBER} 13)${MENU} Seed Random Trades ${NORMAL}"
    echo -e "${MENU}${NUMBER} 14)${MENU} Seed MongoDB Test Environment ${NORMAL}"
    echo -e "${MENU}${NUMBER} 15)${MENU} Seed Rinkeby MongoDB Test Environment ${NORMAL}"
    echo -e "${MENU}${NUMBER} 16)${MENU} Seed Random Orders ${NORMAL}"
    echo -e "${MENU}${NUMBER} 17)${MENU} Back ${NORMAL}"
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
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_db > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      2) clear;
      write "Dropping Pairs";
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_pairs > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      3) clear;
      write "Dropping Tokens";
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_tokens > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      4) clear;
      write "Dropping Account";
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_accounts > /dev/null;
      write_header "Dropped Accounts";
      show_mongo_menu;
      ;;

      5) clear;
      write 'Dropping wallets ';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_wallets > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      6) clear;
      write 'Dropping orders collection...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_orders > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      7) clear;
      write 'Dropping trades collection...'
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/drop_trades > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      8) clear;
      write 'Seed tokens...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_tokens > /dev/null;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_quotes > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      9) clear;
      write 'Seeding pairs...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_pairs > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      10) clear;
      write 'Seeding accounts...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/seed_accounts > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      11) clear;
      write 'Seeding wallets...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_wallets > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      12) clear;
      write 'Seeding random orders and trades...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_random_orders_and_trades > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      13) clear;
      write 'Seeding trades ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_ohlcv_trades > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      14) clear;
      write 'Seeding tokens ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_tokens > /dev/null;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_quotes > /dev/null;
      write 'Seeding pairs ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_pairs > /dev/null;
      write 'Seeding wallets ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_wallets > /dev/null;
      write 'Seeding accounts ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_accounts > /dev/null;
      write 'Done\n'
      show_mongo_menu;
      ;;

      15) clear;
      write 'Seeding tokens ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_rinkeby_tokens > /dev/null;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_rinkeby_quotes > /dev/null;
      write 'Seeding pairs ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_pairs > /dev/null;
      write 'Seeding wallets ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/local/seed_rinkeby_wallets > /dev/null;
      write 'Done\n'
      show_mongo_menu;
      ;;


      16) clear;
      write 'Seeding orders ...';
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/seed_random_orders > /dev/null;
      write 'Done\n';
      show_mongo_menu;
      ;;

      17) clear;
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
  echo -e "${MENU}${NUMBER} 2)${MENU} Query Raw Order Book  ${NORMAL}"
  echo -e "${MENU}${NUMBER} 3)${MENU} Query OrderBook ${NORMAL}"
  echo -e "${MENU}${NUMBER} 4)${MENU} Query Pairs ${NORMAL}"
  echo -e "${MENU}${NUMBER} 5)${MENU} Query Orders  ${NORMAL}"
  echo -e "${MENU}${NUMBER} 6)${MENU} Query Trades ${NORMAL}"
  echo -e "${MENU}${NUMBER} 7)${MENU} Query Addresses ${NORMAL}"
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
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_tokens | less ;
      show_inspect_mongo_menu;
      ;;

      2) clear;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_raw_orderbook | less;
      show_inspect_mongo_menu;
      ;;

      3) clear;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_orderbook | less;
      show_inspect_mongo_menu;
      ;;

      4) clear;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_pairs | less;
      show_inspect_mongo_menu;
      ;;

      5) clear;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_orders | less;
      show_inspect_mongo_menu;
      ;;

      6) clear;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_trades | less;
      show_inspect_mongo_menu;
      ;;

      7) clear;
      AMP_ENVIRONMENT=$AMP_ENVIRONMENT MONGODB_URL=$MONGODB_URL node ../db/common/query_addresses | less;
      show_inspect_mongo_menu;
      ;;

      8) clear;
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
  echo -e "${MENU}${NUMBER} 5)${MENU} Show logs (new tab) ${NORMAL}"
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
      rabbitmqadmin list users;
      show_rabbitmq_menu;
      ;;

      2) clear;
      rabbitmqadmin list queues;
      show_rabbitmq_menu;
      ;;

      3) clear;
      rabbitmqadmin list connections;
      show_rabbitmq_menu;
      ;;

      4) clear;
      rabbitmqadmin list channels
      show_rabbitmq_menu;
      ;;

      5) clear;
      ttab 'cat /usr/local/var/log/rabbitmq/rabbit@localhost.log'
      show_rabbitmq_menu;
      ;;

      6) clear;
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

show_redis_menu(){
  NORMAL=`echo "\033[m"`
  MENU=`echo "\033[36m"` #Blue
  NUMBER=`echo "\033[33m"` #yellow
  FGRED=`echo "\033[41m"`
  RED_TEXT=`echo "\033[31m"`
  ENTER_LINE=`echo "\033[33m"`
  echo -e "${MENU}*********************************************${NORMAL}"
  echo -e "${MENU}${NUMBER} 1)${MENU} Start redis server ${NORMAL}"
  echo -e "${MENU}${NUMBER} 2)${MENU} Connect (remote) ${NORMAL}"
  echo -e "${MENU}${NUMBER} 3)${MENU} Monitor (new tab) ${NORMAL}"
  echo -e "${MENU}${NUMBER} 4)${MENU} Stats ${NORMAL}"
  echo -e "${MENU}${NUMBER} 5)${MENU} Clients Info  ${NORMAL}"
  echo -e "${MENU}${NUMBER} 6)${MENU} Server Info ${NORMAL}"
  echo -e "${MENU}${NUMBER} 7)${MENU} Flush All ${NORMAL}"
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
      ttab redis-server;
      ;;

      2) clear;
      write "Enter host";
      read host;
      write "Enter password";
      read pw;
      ttab redis-cli -h host -p port -a pw;
      ;;

      3) clear;
      ttab redis-cli monitor;
      write "Done\n";
      show_redis_menu;
      ;;

      4) clear;
      redis-cli info stats;
      write "Done\n";
      show_redis_menu;
      ;;

      5) clear;
      redis-cli info clients;
      write "Done\n";
      show_redis_menu;
      ;;

      6) clear;
      redis-cli info server;
      write "Done\n";
      show_redis_menu;
      ;;

      7) clear;
      write "Flushing ...";
      redis-cli flushall > /dev/null;
      write "Done\n";
      show_redis_menu;
      ;;

      8) clear;
      show_menu;
      ;;

      x) exit;
      ;;

      \n) exit;
      ;;

      *) clear;
      write_header "Choose_option"
      show_redis_menu;
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