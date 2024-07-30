require('dotenv').config();

import express from 'express';

import ContractItem from '../models/contracts';

const contractRoute = express();

contractRoute.get('/zhgwnwhemvduhw', async (req, res) => {
    try {
        const contractItems = await ContractItem.find();
        res.json({ contractItems })
    } catch (error) {
        console.error('Error retrieving contract items:', error);
        //throw error;
        res.status(500).json({ error: 'Error getting contracts' });
    }
});

contractRoute.post('/verify', async (req, res) => {
    const {
        contractAddress,
        name,
        symbol,
        initialEncrkeys
    } = req.body;

    try {
        if (contractAddress) {
            console.log(contractAddress);

            const contract = new ContractItem({
                address: contractAddress,
                initialEncrkeys,
                name,
                symbol
            });

            console.log(contract);

            await contract.save();

            res.json({ contract });
        }
    } catch (error) {
        console.error('Deployment error:', error);
        res.status(500).json({ error: 'Verification failed', message: error.message });
    }
})

export default contractRoute;