const fs = require('fs')
const path = require('path');
const argv = require('yargs').argv
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('../utils/abis')
const { contractAddresses, operatorAddresses } = require('../config')
const { getNetworkID, getPrivateKeyFromEnvironment, getInfuraKey } = require('../utils/helpers')

const network = argv.network
if (!network) throw new Error('Usage: node register_operators.js {network}')

const networkID = getNetworkID(network)
const pk = getPrivateKeyFromEnvironment(network)
const infuraKey = getInfuraKey(network)
const addresses = contractAddresses[networkID]

const provider = new providers.InfuraProvider(network, infuraKey)
const signer = new Wallet(pk, provider)

const setRewardAccount = async () => {
    let rewardAccount = "0xDfAb934D4BfA111e3C29D864c36e474880CE0705"
    let exchange = new Contract(addresses['Exchange'], Exchange, signer)
    let tx = await exchange.setRewardAccount(rewardAccount)
    let receipt = await signer.provider.waitForTransaction(tx.hash)

    if (receipt.status === 0) {
        console.log(`Transaction ${tx.hash} failed`)
    } else {
        console.log(`${rewardAccount} is now the reward account`)
    }
}

setRewardAccount()