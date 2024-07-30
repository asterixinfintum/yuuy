require('dotenv').config();

import express from 'express';

const { run } = require('hardhat');

const verifyRoute = express();

import ContractItem from '../models/contracts';


export default verifyRoute;