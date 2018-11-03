const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, Exchange } = require('./abis')
const contractAddresses = require('./contract_addresses.json')
const { accounts } = require('./accounts.js')
const truffleBuildPath = path.join(`${process.env.AMP_DEX_PATH}`, `/build/contracts`);

const pk = '0xf4f803220d23b4ae3b4fecbd0ed9d3c11137571fd1c619154619ef832c8f196f'
const ethereumNodeUrl = process.env.ETHEREUM_NODE_HTTP_URL
const rinkebyAddresses = contractAddresses['4']
const files = fs.readdirSync(truffleBuildPath);
const provider = new providers.InfuraProvider('rinkeby')
const signer = new Wallet(pk, provider)

let baseTokens = [
  'BNB',
  'OMG',
  'ZRX',
  'AE',
  'TRX',
  'MKR',
  'BAT',
  'REP',
  'BTM',
  'NPXS',
  'WTC',
  'KCS',
  'GNT',
  'PPT',
  'SNT',
  'DGX',
  'MITH',
  'AION',
  'LRC',
  'FUN',
  'KNC',
  'LOOM',
  'PRFT'
]

let quoteTokens = [
  'WETH',
  'DAI'
]

let exchange = new Contract(rinkebyAddresses['Exchange'], Exchange, signer)

const registerPairs = async () => {
  for (let quoteTokenSymbol of quoteTokens) {
    for (let baseTokenSymbol of baseTokens) {
      baseTokenAddress = rinkebyAddresses[baseTokenSymbol]
      quoteTokenAddress = rinkebyAddresses[quoteTokenSymbol]

      //TODO custom pricepoint multiplier
      let tx = await exchange.registerPair(baseTokenAddress, quoteTokenAddress, 1e6)
      let receipt = await signer.provider.waitForTransaction(tx.hash)

      console.log(receipt)

      if (receipt.status === '0x1') {
        console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration successful`)
        } else {
        console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration failed`)
      }
    }
  }
}

registerPairs()

