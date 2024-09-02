require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const { toUtf8Bytes, Interface } = ethers;

const folderPath = path.join(__dirname, '../../serverf/flattened');

const verifyContract = async (contractAddress, contractName, encodedArgs) => {
    try {
        const fileName = 'Flattened.sol';
        const sourceCodePath = path.join(folderPath, fileName);
        const etherscanApiKey = `${process.env.ETHERSCAN_API_KEY}`;

        //console.log(etherscanApiKey);

        const sourceCode = fs.readFileSync(sourceCodePath, 'utf8');

        //https://etherscan.io/address/0x85b37BA0dD605550FAeF8642134c4c50827bfc6f#code

        // Prepare data payload for POST request
        const data = new URLSearchParams({
            apikey: "",
            module: 'contract',
            action: 'verifysourcecode',
            contractaddress: contractAddress,
            sourceCode: sourceCode,
            contractname: contractName,
            compilerversion: 'v0.8.17+commit.8df45f5f', // Replace with the exact compiler version used
            optimizationUsed: '1', // 1 if optimization was used, 0 otherwise
            runs: '200', // Compiler optimization runs
            constructorArguments: encodedArgs, // Constructor arguments, if any
            chainId: `1`
        });

        const response = await axios.post('https://api.etherscan.io/api', data.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.status === '1') {
            console.log('Contract verification submitted successfully. Guid:', response.data.result);
        } else {
            console.error('Error verifying contract:', response.data);
        }
    } catch (error) {
        console.error('Error while verifying contract:', error);
    }
};

const verifyRoute = express();

// Ensure you have the correct path to your models
import ContractItem from '../models/contracts';

verifyRoute.post('/verify', async (req, res) => {
    try {
        const { contractaddress } = req.body;

        //console.log(contractaddress);
        const contractitm = await ContractItem.findOne({ address: contractaddress });

        if (!contractitm) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        const { name, address, symbol, initialEncrkeys } = contractitm;

        const initEncKey = toUtf8Bytes(initialEncrkeys);

        const abi = [
            "constructor(string name_, string symbol_, bytes initialEncrkeys)"
        ];

        const contractInterface = new Interface(abi);

        // Encode the constructor arguments using encodeFunctionData for constructor
        const encodedArgs = contractInterface.encodeDeploy([name, symbol, initialEncrkeys]);

        // Remove the method selector from encodedArgs since it's for constructor
        const encodedArgsWithoutSelector = encodedArgs.slice(2);  // Remove the '0x' prefix

        

        console.log('tester', encodedArgsWithoutSelector, 'tester');

        //console.log('Encoded constructor arguments:', encodedArgsWithoutSelector);

        await verifyContract(address, name, encodedArgsWithoutSelector);

        res.status(200).json({ message: 'Verification submitted' });

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Verification failed', message: error.message });
    }
});

export default verifyRoute;