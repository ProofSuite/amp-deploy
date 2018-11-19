const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20 } = require('../utils/abis')
const { contractAddresses, testAccounts } = require('../config')

const pk = process.env.AMP_RINKEBY_PRIVATE_KEY || '0xf4f803220d23b4ae3b4fecbd0ed9d3c11137571fd1c619154619ef832c8f196f'
const addresses = contractAddresses['4']
const accounts = testAccounts['4']

let provider = new providers.InfuraProvider('rinkeby', '63739bbdf74143aeb0e6d8bb8307084f')
let signer = new Wallet(pk, provider)
let amount = "100000000000000000000" // 100 * 1e18 (amount to approve)

const approveTokens = async () => {
  for (let account of accounts) {
    for (let symbol in addresses) {
      if (symbol !== 'Exchange') {
        let token = new Contract(addresses[symbol], ERC20, signer)
        let tx = await token.transfer(account, amount)
        let receipt = await signer.provider.waitForTransaction(tx.hash)

        if (receipt.status === 0) {
          console.log(`Transaction ${tx.hash} failed`)
        } else {
          console.log(`${amount} sent to ${account}`)
        }
      }
    }
  }
}

approveTokens()