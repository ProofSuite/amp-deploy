# These variables are used for management tools to interact with the different files of the system
export AMP_CLIENT_PATH='~/Programming/Ethereum/Proofsuite/amp-client/'
export AMP_ENGINE_PATH='~/Programming/Go/src/github.com/Proofsuite/amp-engine'
export AMP_DEX_PATH='~/Programming/Ethereum/Proofsuite/amp-dex/'
export AMP_DB_SCRIPTS_PATH='~/Programming/Ethereum/Proofsuite/amp-db/'

# These variables are mainly used for the development environment.
export AMP_ENGINE_HTTP_URL='http://localhost:8081'
export AMP_ENGINE_WS_URL='ws://localhost:8081'
export AMP_ETHEREUM_NODE_HTTP_URL='http://localhost:8545'
export AMP_ETHEREUM_NODE_URL='http://localhost:8545'
export AMP_ETHEREUM_NODE_WS_URL='ws://localhost:8546'
export AMP_MONGO_URL='127.0.0.1'
export AMP_MONGO_DBNAME='proofdex'
export AMP_REDIS_URL='redis://localhost:6379'
export AMP_RABBITMQ_URL='amqp://guest:guest@localhost:5672/'
export AMP_MONGO_DBPATH='/data/db'
export AMP_ETHEREUM_DATADIR='~/private-geth-chain/chain'
export AMP_ETHEREUM_NETWORK_ID=8888
export AMP_ETHEREUM_GENESIS='~/private-geth-chain/genesis.json'
export AMP_ETHEREUM_DAG='/Users/davidvanisacker/.ethash'
export AMP_ETHEREUM_DAG_CACHE='~/private-geth-chain/chain/geth/ethash'
export AMP_ETHERBASE='0xe8e84ee367bc63ddb38d3d01bccef106c194dc47'
export AMP_EXCHANGE_CONTRACT_ADDRESS='0x8a93df8d3d8201c0fa722dae65cc7a9f3cb3ee3f'
export AMP_WETH_CONTRACT_ADDRESS='0x24c7db6f5da8310212c0ce7a2a390bedad37c829'
export AMP_FEE_ACCOUNT_ADDRESS='0xe8e84ee367bc63ddb38d3d01bccef106c194dc47'

# These variables are used for the staging/rinkeby environment. You can leave these variables as they are in the template
export AMP_RINKEBY_ETHERBASE='0xcc5697310277bcc3be506f53ed8aafc9d17a2c18'
export AMP_RINKEBY_EXCHANGE_CONTRACT_ADDRESS='0x9cc2feea9a0a8851ecea0f5d10f164e4642a2e4c'
export AMP_RINKEBY_WETH_CONTRACT_ADDRESS='0xa2c04faee0c109ac75191432ca836844228f36db'
export AMP_RINKEBY_FEE_ACCOUNT_ADDRESS='0x3b89e78363d872c80c78c254bf1bb9ff9e586571'
export AMP_RINKEBY_INFURA_NODE_HTTP_URL='https://mainnet.infura.io'
export AMP_RINKEBY_INFURA_NODE_WS_URL='wss://rinkeby.infura.io/ws'

# These variables are used for the mainnet environment. You can leave these variables as they are in the template
export AMP_MAINNET_ETHERBASE=''
export AMP_MAINNET_EXCHANGE_CONTRACT_ADDRESS=''
export AMP_MAINNET_WETH_CONTRACT_ADDRESS=''
export AMP_MAINNET_FEE_ACCOUNT_ADDRESS=''
export AMP_MAINNET_INFURA_NODE_HTTP_URL='https://mainnet.infura.io'
export AMP_MAINNET_INFURA_NODE_WS_URL='wss://mainnet.infura.io/ws'




