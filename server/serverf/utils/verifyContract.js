require('dotenv').config(); 
 
import runCommand from './runCommand'; 
 
async function verifyContract({ name, symbol, tokenAddress, initialEncrKeys }) { 
    try { 
        const verifyCommand = [ 
            'npx', 
            'hardhat', 
            'verify', 
            '--network', 
            'mainnet', 
            tokenAddress, 
            name, 
            symbol, 
            initialEncrKeys 
        ]; 
 
        console.log(`Executing verify command: ${verifyCommand.join(' ')}`); 
 
        await new Promise(resolve => setTimeout(resolve, 20000)); 
 
        await runCommand(verifyCommand[0], verifyCommand.slice(1), {}); 
 
        console.log('Contract verified successfully.'); 
 
        return { tokenAddress, initialEncrKeys } 
    } catch (error) { 
        console.error(`Error during verification: ${error.message}`); 
        console.error(`Verification failed: ${error.message}`); 
        throw error; 
    } 
} 
 
module.exports = verifyContract;