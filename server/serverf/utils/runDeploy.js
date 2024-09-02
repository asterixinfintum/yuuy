require('dotenv').config();

const fs = require('fs').promises;
const path = require('path');
const ethers = require('ethers');

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

async function runDeploy() {
    const artifactPath = await getArtifactPath(basePath);
    const artifactDetails = await getArtifactDetails(artifactPath);
    const abi = artifactDetails.abi;
    const bytecode = artifactDetails.bytecode;
    const initialEncrkeys = ethers.AbiCoder.defaultAbiCoder().encode(['bytes32'], [ethers.keccak256(ethers.toUtf8Bytes(generateDeterministicRandomString()))]);

    //console.log(abi, bytecode, initialEncrkeys);

    return { abi, bytecode, initialEncrkeys }
}

export default runDeploy;