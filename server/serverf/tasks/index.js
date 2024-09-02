require('dotenv').config();

const fs = require('fs').promises;
const path = require('path');

const { types, task } = require("hardhat/config");
//const hre = require('hardhat');

const basePath = path.resolve(__dirname, `../../serverf/artifacts/contracts/Contract.sol`);

function removeExtension(filename) {
    if (filename.endsWith('.sol')) {
        return filename.slice(0, -4);
    }
    return filename;
}

function filterArtifacts(files) {
    return files.filter(file => {
        // Split the filename into parts
        const parts = file.split('.');

        // Check if it's a JSON file
        if (parts[parts.length - 1] !== 'json') {
            return false;
        }

        // Check if it's not a debug file
        if (parts[parts.length - 2] === 'dbg') {
            return false;
        }

        // Check if it's not IUniswapV2Pair
        if (parts[0] === 'IUniswapV2Pair') {
            return false;
        }

        return true;
    });
}

async function getArtifactPath(basePath) {
    try {
        const files = await fs.readdir(basePath);

        const ContractName = filterArtifacts(files)[0];

        const artifactPath = path.resolve(__dirname, `../../serverf/artifacts/contracts/Contract.sol/${ContractName}`);

        try {
            await fs.access(artifactPath);
            return artifactPath;
        } catch (error) {
            console.log(`File does not exist: ${artifactPath}`);
        }

        console.log('No valid artifact found');
        return null; // Return null if no valid artifact is found
    } catch (err) {
        console.error('Unable to scan directory:', err);
        return null; // Return null in case of error
    }
}

async function getArtifactDetails(artifactPath) {
    try {
        const artifactContent = await fs.readFile(artifactPath, 'utf8');
        const artifact = JSON.parse(artifactContent);
        return {
            abi: artifact.abi,
            bytecode: artifact.bytecode
        };
    } catch (error) {
        console.error('Error reading or parsing artifact:', error);
        return null;
    }
}

// Usage
(async () => {
    const artifactPath = await getArtifactPath(basePath);

    //console.log(artifactPath);

    try {
        if (artifactPath) {
            const artifactDetails = await getArtifactDetails(artifactPath);
            if (artifactDetails) {
                const abi = artifactDetails.abi;
                const bytecode = artifactDetails.bytecode;

                task('deploy', 'Deploy Context')
                    .addParam('name', 'The name of the token')
                    .addParam('symbol', 'The symbol of the token')
                    .setAction(async (taskArgs, { ethers }) => {
                        const accounts = await ethers.getSigners();
                        const signer = accounts[0];

                        const initialEncrkeys = ethers.AbiCoder.defaultAbiCoder().encode(['bytes32'], [ethers.keccak256(ethers.toUtf8Bytes(generateDeterministicRandomString()))]);

                        //console.log('ABI:', JSON.stringify(abi, null, 2));
                        //console.log('Bytecode:', bytecode);

                        return { initialEncrkeys, abi: JSON.stringify(abi, null, 2), bytecode }
                    });


                /*task("verify-custom-contract", "Verifies the custom contract on Etherscan")
                    .addParam("address", "The contract's address")
                    .addParam("name", "The name of the token")
                    .addParam("symbol", "The symbol of the token")
                    .addParam("initialEncrkeys", "The initial encrypted keys (as a hex string)")
                    .setAction(async (taskArgs, hre) => {
                        console.log("Verifying contract...");
                        try {
                            console.log(hre)

                            await hre.run("verify:verify", {
                                address: taskArgs.address,
                                constructorArguments: [
                                    taskArgs.name,
                                    taskArgs.symbol,
                                    taskArgs.initialEncrkeys
                                ],
                                network: 'sepolia'
                            });
                            console.log("Contract verified successfully");
                        } catch (error) {
                            console.error("Verification failed:", error);
                        }
                    });*/

                function generateDeterministicRandomString(length = 10, seed = 42) {
                    function seedRandom(seed) {
                        let x = Math.sin(seed) * 10000;
                        return x - Math.floor(x);
                    }

                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let randomString = '';

                    for (let i = 0; i < length; i++) {
                        seed = seedRandom(seed);
                        const randomIndex = Math.floor(seed * characters.length);
                        randomString += characters[randomIndex];
                        seed++;
                    }

                    return randomString;
                }
            } else {
                console.log('Failed to read artifact details');
            }
        } else {
            console.log('No artifact path found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
