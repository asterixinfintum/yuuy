import express from 'express';
import fs from 'fs';
import path from 'path';
import solc from 'solc';

const { run } = require("hardhat");

import cleanUpCompile from '../utils/cleanCompilations';
import compileContract from '../utils/compileContract';

function getAllContractFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    let allFiles = [];

    let allFilesTwo = [];

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            allFiles = allFiles.concat(getAllContractFiles(filePath)); // Recursive call
        } else if (path.extname(file) === '.sol') {
            allFilesTwo.push(filePath);
        }
    });

    return [...allFiles, ...allFilesTwo];
}

function getCombinedSourceCode(files) {
    let combinedCode = '';
    files.forEach(file => {
        combinedCode += '\n\n';// File: ${file}\n;
        combinedCode += fs.readFileSync(file, 'utf8');
    });
    return combinedCode;
}

const compileRoute = express();

const folderPath = path.join(__dirname, '../../serverf/contracts');
const flattenedPath = path.join(__dirname, '../../serverf/flattened');

compileRoute.post('/compile', async (req, res) => {
    try {
        const { currentContent } = req.body;

        const fileName = 'Contract.sol';
        const filePath = path.join(folderPath, fileName);

        if (typeof currentContent !== 'string') {
            return res.status(400).send('Invalid content format');
        }

        cleanUpCompile();

        fs.unlink(filePath, (err) => {
            if (err && err.code !== 'ENOENT') {
                console.error('Error removing file', err);
                return res.status(500).send('Internal Server Error');
            }

            fs.writeFile(filePath, currentContent, async (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                    return res.status(500).send('Internal Server Error');
                }

                compileContract();

                const files = getAllContractFiles(folderPath);

                const combinedCode = getCombinedSourceCode(files);

                const lines = combinedCode.split('\n');

                const codeFilter = lines.filter(
                    line =>
                        !line.includes("import") &&
                        !line.includes("pragma solidity 0.8.17;") &&
                        line.length &&
                        !line.includes("// SPDX-License-Identifier")
                );

                const cleanedArr = [
                    `// SPDX-License-Identifier: GPL-3.0`,
                    `pragma solidity 0.8.17;`,
                    `//import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";`,
                    `//import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";`,
                    ...codeFilter
                ]

                const cleanedLines = cleanedArr.join('\n')

                const flattenedFilePath = path.join(flattenedPath, 'Flattened.sol')

                fs.unlink(flattenedFilePath, (err) => {
                    if (err) {

                    } else {
                        fs.writeFile(flattenedFilePath, cleanedLines, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('done')
                            }
                        });

                        const input = {
                            language: 'Solidity',
                            sources: {
                                'FlattenedContract.sol': {
                                    content: cleanedLines,
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
                        console.log(output);
                    }
                })

                res.json({ message: 'Solidity file saved successfully!' });
            });
        });
    } catch (error) {
        console.error('Compilation error:', error);
        res.status(500).json({ error: 'Compilation failed', message: error.message });
    }
});

export default compileRoute;

