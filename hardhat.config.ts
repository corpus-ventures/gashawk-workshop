/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "dotenv/config";
import "hardhat-deploy";
import "solidity-coverage";

require("hardhat-gas-reporter");
import "hardhat-gas-reporter";

module.exports = {
    defaultNetwork: "mainnet",
    hardhat: {},
    networks: {
        mainnet: {
            url: "https://eth-mainnet.alchemyapi.io/v2/fORbbzWLRjURSB-DaH1nx0ovkjLn2maI",
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
            },
        ],
    },
    mocha: {
        timeout: 100000,
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 21,
    },
};
