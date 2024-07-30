import express from 'express';
import fs from 'fs';
import path from 'path';

import cleanUpCompile from '../utils/cleanCompilations';
import compileContract from '../utils/compileContract';

const compileRoute = express();

const folderPath = path.join(__dirname, '../../serverf/contracts');

compileRoute.post('/compile', async (req, res) => {
    try {
        const { currentContent } = req.body;

        const fileName = 'Contract.sol';
        const filePath = path.join(folderPath, fileName);

        if (typeof currentContent !== 'string') {
            return res.status(400).send('Invalid content format');
        }

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

                await cleanUpCompile();

                await compileContract();

                res.json({ message: 'Solidity file saved successfully!' });
            });
        });
    } catch (error) {
        console.error('Compilation error:', error);
        res.status(500).json({ error: 'Compilation failed', message: error.message });
    }
});

export default compileRoute;

