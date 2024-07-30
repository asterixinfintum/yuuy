require('dotenv').config();

import express from 'express';

const authRoute = express();

authRoute.post('/authenticate', async (req, res) => {
    const { address } = req.body;

    if (address) {
        req.session.address = address;

        res.json({ message: 'logged in', address })
    } else {
        res.status(401).send('Please log in first');
    }
});

authRoute.get('/authenticate', async (req, res) => {
    if (req.session.address) {
        res.send(`Hello, ${req.session.address}`);
    } else {
        res.status(401).send('Please log in first');
    }
})

authRoute.post('/unauthenticate', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to destroy session');
        }
        res.send('Logged out successfully');
    });
})

export default authRoute;