require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic.id_1, `https://rinkeby.infura.io/v3/d4c7101b7a7e45fd8adaaf71881b6be4`),
      network_id: 4
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic.id_2, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
