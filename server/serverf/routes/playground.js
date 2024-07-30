require('dotenv').config();

const generateDeterministicRandomString = require('./geneString');

const hardhat = require('hardhat');

const { utils } = require('ethers');

const { CONTRACTS } = require('./constants');

const { types, task } = require("hardhat/config");

function deployContract(name, symbol) {
    task('deploy', 'Deploy Context')
        .addParam('name', 'The name of the token')
        .addParam('symbol', 'The symbol of the token')
        .setAction(async (taskArgs, { ethers }) => {
            const accounts = await ethers.getSigners();
            const signer = accounts[0];

            const initialEncrkeys = ethers.encodeBytes32String(generateDeterministicRandomString());

            console.log('check:', signer, initialEncrkeys);

            /*const contract = await ethers.deployContract(CONTRACTS.BRX, [
                name, symbol, signer, initialEncrkeys
            ]);

            console.log(`tokenaddress: ${contract.target}`);
            console.log('initialEncrkeys:', initialEncrkeys);*/
        });

}

/*task('deploy', 'Deploy Context')
    .addParam('name', 'The name of the token')
    .addParam('symbol', 'The symbol of the token')
    .setAction(async (taskArgs, { ethers }) => {
        const accounts = await ethers.getSigners();
        const signer = accounts[0];

        const initialEncrkeys = ethers.encodeBytes32String(generateDeterministicRandomString());

        const MyContract = await ethers.getContractFactory('Contract');

        console.log(MyContract);

        /*const contract = await ethers.deployContract(CONTRACTS.CONTRACT, [
            taskArgs.name, taskArgs.symbol, initialEncrkeys
        ]);

        console.log(`tokenaddress: ${contract.target}`);
        console.log('initialEncrkeys:', initialEncrkeys);
    })*/

    //"ethers": "^6.12.1",

//console.log(MyContract.bytecode);
            // console.log(CONTRACTS.CONTRACT)
            /*const unsignedTx = await MyContract.getDeployTransaction(taskArgs.name, taskArgs.symbol, initialEncrkeys);
    
            const serializedTx = {
                to: null, // 'to' should be null for contract deployment
                data: unsignedTx.data,
                gasPrice: '0', // Placeholder, will be set on the server
                gasLimit: '0', // Placeholder, will be set on the server
                value: '0', // Assuming no ETH is being sent with the transaction
                nonce: null, // Placeholder, will be set on the server
                chainId: null // Placeholder, will be set on the server
            };
    
            return { unsignedTx: serializedTx, initialEncrkeys };
    
            /*const initialEncrkeys = ethers.encodeBytes32String(generateDeterministicRandomString());
    
            const MyContract = await ethers.getContractFactory('Contract');
            const unsignedTx = await MyContract.getDeployTransaction(taskArgs.name, taskArgs.symbol, initialEncrkeys);
    
            console.log(ethers)
           // const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_ETH_URL);
    
    
            /*const serializedTx = {
                to: unsignedTx.to || null,
                data: unsignedTx.data || null,
                gasPrice: unsignedTx.gasPrice ? unsignedTx.gasPrice.toString() : '0',
                gasLimit: unsignedTx.gasLimit ? unsignedTx.gasLimit.toString() : '0',
                value: unsignedTx.value ? unsignedTx.value.toString() : '0',
                nonce: unsignedTx.nonce !== undefined ? unsignedTx.nonce : null,
                chainId: unsignedTx.chainId !== undefined ? unsignedTx.chainId : null
            };
    
            console.log(unsignedTx.gasPrice, unsignedTx.chainId, unsignedTx.nonce, unsignedTx.value, unsignedTx.gasLimit);
    
            //return { unsignedTx, initialEncrkeys };
    
            /*const contract = await ethers.deployContract(CONTRACTS.CONTRACT, [
                taskArgs.name, taskArgs.symbol, initialEncrkeys
            ]);
    
            console.log(`tokenaddress: ${contract.target}`);
            console.log('initialEncrkeys:', initialEncrkeys);*/

            /*fs.readdir(basePath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory:', err);
    }

    files.forEach(file => {
        if (file.endsWith('.sol')) {
            console.log(removeExtension(file));
            const contractName = removeExtension(file);
            artifactPath = path.resolve(__dirname, `../../serverf/artifacts/contracts/${contractName}.sol/${contractName}.json`);
        }
    });
});*/

/*function removeExtension(filename) {
    if (filename.endsWith('.sol')) {
        return filename.slice(0, -4);
    }
    return filename;
}

let artifactPath;

async function getArtifactPath(basePath) {
    try {
        const files = fs.readdir(basePath);
        
        files.forEach(file => {
            if (file.endsWith('.sol')) {
                console.log(removeExtension(file));
                const contractName = removeExtension(file);
                artifactPath = path.resolve(__dirname, `../../serverf/artifacts/contracts/${contractName}.sol/${contractName}.json`);

                console.log(artifactPath)
            }
        });
        return artifactPath;
    } catch (err) {
        console.error('Unable to scan directory:', err);
    }
}

(async () => {
    await getArtifactPath(basePath);
})()


/*(async () => {
    artifactPath = await getArtifactPath(basePath);
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    const abi = artifact.abi;
    const bytecode = artifact.bytecode;

    task('deploy', 'Deploy Context')
        .addParam('name', 'The name of the token')
        .addParam('symbol', 'The symbol of the token')
        .setAction(async (taskArgs, { ethers }) => {
            const accounts = await ethers.getSigners();
            const signer = accounts[0];

            const initialEncrkeys = ethers.AbiCoder.defaultAbiCoder().encode(['bytes32'], [ethers.keccak256(ethers.toUtf8Bytes(generateDeterministicRandomString()))]);

            const MyContract = await ethers.getContractFactory('Contract');

            console.log('ABI:', JSON.stringify(abi, null, 2));
            console.log('Bytecode:', bytecode);

            return { initialEncrkeys, abi: JSON.stringify(abi, null, 2), bytecode }
        });


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


})();*/