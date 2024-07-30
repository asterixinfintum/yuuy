require('dotenv').config();

const hre = require("hardhat");

async function changeNetwork(networkName) {
    hre.network.name = networkName;
    const config = hre.config.networks[networkName];
    if (!config) {
        throw new Error(`Network configuration for "${networkName}" not found`);
    }

    hre.network.config = config;
}

async function verifyContract(address, constructorArguments, networkName) {
    await changeNetwork(networkName);

    console.log(`Verifying contract at address: ${address}`);
    try {
        await hre.run("verify:verify", { address: address, constructorArguments: constructorArguments });
        console.log(`Contract verified successfully at address: ${address}`);
    } catch (error) {
        console.log('Verification failed:', error);
    }
}

module.exports = verifyContract;