require('dotenv').config();

require('@nomicfoundation/hardhat-toolbox');
require('hardhat-gas-reporter');

require('./serverf/tasks');

const { flatten } = require('lodash');
const path = require("path");

const ACCOUNT_PRIVATE_KEY = `0b7bb2b2bde891315a7e3d3859082bf602a899a8413a0896823279c47ad4d9fd`;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  paths: {
    root: path.join(__dirname, "./serverf"),
    sources: path.join(__dirname, "./serverf/contracts"),
    cache: path.join(__dirname, "./serverf/.cache"),
    artifacts: path.join(__dirname, "./serverf/artifacts"),
    flattened: path.join(__dirname, "./serverf/flattened"),
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `${process.env.MAINNET_ETH_URL}`,
      accounts: [`${ACCOUNT_PRIVATE_KEY}`],
      chainId: 1,
      gas: 'auto',
    },
    sepolia: {
      url: `${process.env.SEPOLIA_ETH_URL}`,
      accounts: [`${ACCOUNT_PRIVATE_KEY}`],
      chainId: 11155111,
      gas: 'auto',
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
  },
};
