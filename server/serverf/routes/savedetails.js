require('dotenv').config();

const express = require('express');

import ContractItem from '../models/contracts';

const saveDetailRoute = express();


saveDetailRoute.post('/savecontract', async (req, res) => {
    try {
        const {
            contractAddress,
            name,
            symbol,
            initialEncrkeys,
        } = req.body;

        console.log(contractAddress,
            name,
            symbol,
            initialEncrkeys,)

        const newContract = new ContractItem({
            address: contractAddress,
            name: name,
            symbol: symbol,
            initialEncrkeys: initialEncrkeys,
        });

        await newContract.save();

        res.status(201).send({ message: 'contract saved' });
    } catch (error) {
        console.error('Saving Contract failed:', error);
        res.status(500).json({ error: 'Saving Contract failed', message: error.message });
    }
})

export default saveDetailRoute;