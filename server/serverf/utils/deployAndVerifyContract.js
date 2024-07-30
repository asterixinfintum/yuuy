require('dotenv').config();

import runCommand from './runCommand';

async function deployAndVerifyContract({ name, symbol, signer, contract, networkName }) {
    try {
        const deployCommand = [
            'npx',
            'hardhat',
            'deploy',
            '--network',
            networkName,
            '--name',
            name,
            '--symbol',
            symbol
        ];

        console.log(`Executing deploy command: ${deployCommand.join(' ')}`);
        const { stdout, stderr } = await runCommand(deployCommand[0], deployCommand.slice(1), {});
        console.log('Contract deployed successfully.');

        console.log(stdout);
        return { unsignedTx: stdout }

        //const { tokenAddress, initialEncrKeys } = extractValues(stdout);

        //console.log(tokenAddress, initialEncrKeys);

       /* const verifyCommand = [
            'npx',
            'hardhat',
            'verify',
            '--network',
            networkName,
            tokenAddress,
            name,
            symbol,
            initialEncrKeys
        ];

        console.log(`Executing verify command: ${verifyCommand.join(' ')}`);


        await new Promise(resolve => setTimeout(resolve, 20000));

        await runCommand(verifyCommand[0], verifyCommand.slice(1), {});

        console.log('Contract verified successfully.');

        return { tokenAddress, initialEncrKeys }*/
    } catch (error) {
        console.error(`Error during deployment: ${error.message}`);
        console.error(`Deployment to ${networkName} failed: ${error.message}`);
        throw error;
    }
}

function extractValues(input) {
    const lines = input.split('\n');
    let tokenAddress = '';
    let initialEncrKeys = '';

    for (const line of lines) {
        if (line.toLowerCase().startsWith('tokenaddress:')) {
            tokenAddress = line.split(':')[1].trim();
        } else if (line.toLowerCase().startsWith('initialencrkeys:')) {
            initialEncrKeys = line.split(':')[1].trim();
        }
    }

    // Validate extracted values
    if (!/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
        throw new Error('Invalid token address format');
    }
    if (!/^0x[a-fA-F0-9]{64}$/.test(initialEncrKeys)) {
        throw new Error('Invalid initial encryption keys format');
    }

    return { tokenAddress, initialEncrKeys };
}

export default deployAndVerifyContract;