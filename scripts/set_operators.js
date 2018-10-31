const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('./abis')
const contractAddresses = require('./contract_addresses.json')
const { operators } = require('./operators.js')
const truffleBuildPath = path.join(`${process.env.AMP_DEX_PATH}`, `/build/contracts`);

const pk = '0xf4f803220d23b4ae3b4fecbd0ed9d3c11137571fd1c619154619ef832c8f196f'
const ethereumNodeUrl = process.env.ETHEREUM_NODE_HTTP_URL
const rinkebyAddresses = contractAddresses['4']
const files = fs.readdirSync(truffleBuildPath);
const provider = new providers.InfuraProvider('rinkeby')
const signer = new Wallet(pk, provider)

const setOperators = async () => {
  for (let operator of operators) {
    let exchange = new Contract(rinkebyAddresses['Exchange'], Exchange, signer)
    let tx = await exchange.setOperator(operator, true)
    let receipt = await signer.provider.waitForTransaction(tx.hash)

    if (receipt.status === '0x0') {
      console.log(`Transaction ${tx.hash} failed`)
    } else {
      console.log(`${operator} is now an operator`)
    }
  }
}

setOperators()


