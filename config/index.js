require('dotenv').config()

const { utils } = require('ethers')
const contractAddresses = require('./contractAddresses.json')
const quoteTokens = ['USDC', 'WETH', 'DAI']
const baseTokens = [ "AE", "BAT", "BNB", "KNC", "LOOM", "LRC", "MITH", "MKR", "NPXS", "OMG", "PRFT", "REP", "SNT", "WTC", "ZRX"]

const makeFees = {
  "WETH": utils.bigNumberify(10).pow(18).div(250),
  "DAI": utils.bigNumberify(10).pow(18).div(2),
  "USDC": utils.bigNumberify(10).pow(6).div(2)
}

const takeFees = {
  "WETH": utils.bigNumberify(10).pow(18).div(250),
  "DAI": utils.bigNumberify(10).pow(18).div(2),
  "USDC": utils.bigNumberify(10).pow(6).div(2)
}

const decimals = {
  "AE": 18,
  "BAT": 18,
  "BNB": 18,
  "DAI": 18,
  "KNC": 18,
  "LOOM": 18,
  "LRC": 18,
  "MITH": 18,
  "MKR": 18,
  "NPXS": 18,
  "OMG": 18,
  "PRFT": 18,
  "REP": 18,
  "SNT": 18,
  "WETH": 18,
  "WTC": 18,
  "ZRX": 18,
  "TUSD": 18,
  "USDC": 6
}

const operatorAddresses = {
  "1": [
    '0xA0841B098D5E7968DE215def3c4bcd1d1970949D',
    '0x95b673d8CE471EaC57C3175a9ed3Bab82e342105',
    '0x93203E753c4C254E213c402f91e0dEd31304231e',
    '0x837cB5aEB052988705Eb44A266f40e8ff05963B0'
  ],
  "4": [
    '0xe0a1240b358dfa6c167edea09c763ae9f3b51ea0',
    '0x53ee745b3d30d692dc016450fef68a898c16fa44',
    '0xc8b74b6b883a96e3defd62934ec3a1e44f149860',
    '0xbf8e9e3f9dbb85554679ce8147077b0496358f53'
  ]
}

const testAccounts = [
    "0xcc5697310277bcc3be506f53ed8aafc9d17a2c18",
    "0x3b89e78363d872c80c78c254bf1bb9ff9e586571",
    "0xf2934427c36ba897f9be6ed554ed2dbce3da1c68",
    "0xfa4f991caa4f37f7bce2e285e155da8c929658ef",
    "0xb21a999ba39015df00ee33e55caf08af86b46bfa",
    "0xdc64ae432d848cf38a89c6f30a04884e22e83c74",
    "0xbf8e9e3f9dbb85554679ce8147077b0496358f53",
    "0xc8b74b6b883a96e3defd62934ec3a1e44f149860",
    "0x53ee745b3d30d692dc016450fef68a898c16fa44",
    "0xe0a1240b358dfa6c167edea09c763ae9f3b51ea0"
]

const keys = {
  "1": process.env.AMP_MAINNET_KEYS.split(','),
  "4": process.env.AMP_RINKEBY_KEYS.split(',')
}

const infuraKeys = {
  "1": process.env.AMP_MAINNET_INFURA_KEY,
  "4": process.env.AMP_RINKEBY_INFURA_KEY,
}

module.exports = {
  quoteTokens,
  baseTokens,
  takeFees,
  makeFees,
  decimals,
  operatorAddresses,
  testAccounts,
  contractAddresses,
  keys,
  infuraKeys
}