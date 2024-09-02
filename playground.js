const verifyContract = require("./server/serverf/utils/verifyContract");

//verifyContract('0xe50718Ec2afF0808874e2426b9156fAA07E765aa', ['name', 'symbol', '0x0C0eA0D6d0E329873F58810e92F98C9C0938D227', '0x77644f746f4e3455573800000000000000000000000000000000000000000000']);

const fs = require('fs');
const path = require('path');
const solc = require('solc');

// Function to get all Solidity files from the contracts directory
function getAllContractFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  let allFiles = [];

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      allFiles = allFiles.concat(getAllContractFiles(filePath)); // Recursive call
    } else if (path.extname(file) === '.sol') {
      allFiles.push(filePath);
    }
  });

  return allFiles;
}

// Function to get the combined source code from multiple files
function getCombinedSourceCode(files) {
  let combinedCode = '';
  files.forEach(file => {
    combinedCode += \n\n// File: ${file}\n;
    combinedCode += fs.readFileSync(file, 'utf8');
  });
  return combinedCode;
}

// Function to flatten contracts
async function flattenContracts(dirPath) {
  const contractFiles = getAllContractFiles(dirPath);
  const combinedCode = getCombinedSourceCode(contractFiles);

  // Compile the contract and get the flattened code
  const input = {
    language: 'Solidity',
    sources: {
      'FlattenedContract.sol': {
        content: combinedCode,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  // Extract the flattened source code
  const flattenedCode = output.sources['FlattenedContract.sol'].content;

  return flattenedCode;
}

// Main function
async function main() {
  try {
    const contractsDir = 'contracts'; // Specify your contracts directory
    const flattenedCode = await flattenContracts(contractsDir);

    // Write the flattened code to a file
    const outputPath = path.resolve('FlattenedContract.sol');
    fs.writeFileSync(outputPath, flattenedCode);

    console.log(`Flattened contract saved to ${outputPath}`);
  } catch (error) {
    console.error('Error during flattening:', error);
  }
}

main();