const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20 } = require('./abis')
const contractAddresses = require('./contract_addresses.json')
const { accounts } = require('./accounts.js')
const truffleBuildPath = path.join(`${process.env.AMP_DEX_PATH}`, `/build/contracts`);

const pk = process.env.AMP_RINKEBY_PRIVATE_KEY || '0xf4f803220d23b4ae3b4fecbd0ed9d3c11137571fd1c619154619ef832c8f196f'
const ethereumNodeUrl = process.env.ETHEREUM_NODE_HTTP_URL
const rinkebyAddresses = contractAddresses['4']
const files = fs.readdirSync(truffleBuildPath);


let provider = new providers.InfuraProvider('rinkeby')
let signer = new Wallet(pk, provider)
let amount = "100000000000000000000" //100 * 1e18


const transferTokens = async () => {
  for (let account of accounts) {
    for (let symbol in rinkebyAddresses) {
      if (symbol !== 'Exchange' && symbol !== 'WETH') {
        let token = new Contract(rinkebyAddresses[symbol], ERC20, signer)

        let tx = await token.transfer(account, amount)
        let receipt = await signer.provider.waitForTransaction(tx.hash)

        if (receipt.status === '0x0') {
          console.log(`Transaction ${tx.hash} failed ${symbol}`)
        } else {
          console.log(`${amount} ${symbol} sent to ${account}`)
        }
      }
    }
  }
}

transferTokens()

