require('dotenv').config();

import express from 'express';

const { run } = require('hardhat');

const deployRoute = express();

deployRoute.post('/deploy', async (req, res) => {

    try {
        const { name, symbol, network, signer } = req.body;

        if (name.length && symbol.length && network.length && signer) {
            const { abi, initialEncrkeys, bytecode } = await run('deploy', { name, symbol });

            if (!abi || !initialEncrkeys || !bytecode) {
                throw new Error('All fields required');
            }

            res.status(200).json({
                abi,
                initialEncrkeys,
                bytecode
            });
        }
    } catch (error) {
        console.error('Deployment error:', error);
        res.status(500).json({ error: 'Deployment failed', message: error.message });
    }
});


export default deployRoute;