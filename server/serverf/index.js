if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

import "regenerator-runtime";
import express from "express";
import http from "http";
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import routes from './routes';
import cron from 'node-cron';

import verifyContract from './utils/verifyContract;'

const app = express();
const server = http.createServer(app);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Ensures the cookie is sent only over HTTP(S)
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

const allowedOrigins = [`${process.env.baseurl}`, `${process.env.wwwbaseurl}`]; // Add your domains here

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

cron.schedule('*/15 * * * *', async () => { 
    console.log('hello world'); 
    const contrcs = await ContractItem.find(); 
 
    if (contrcs.length) { 
        const itms = contrcs.filter(ctrct => ctrct.initialEncrkeys && ctrct.initialEncrkeys.length); 
 
        const unverifieds = itms.filter(itm => !itm.isVerified); 
 
        if (unverifieds.length) { 
            unverifieds.forEach(async (unve) => { 
                const { _id, name, symbol, address, initialEncrkeys } = unve; 
                console.log(name, symbol, address, initialEncrkeys) 
                await verifyContract({ name, symbol, tokenAddress: address, initialEncrKeys: initialEncrkeys }); 
 
                const updatedContract = await ContractItem.findOneAndUpdate( 
                    { _id }, 
                    { isVerified: true }, 
                    { new: true, useFindAndModify: false }  
                ); 
 
                console.log('Updated Contract :', updatedContract); 
            }) 
        } 
    } 
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const { deployRoute, compileRoute, authRoute, verifyRoute, contractRoute } = routes;

app.use(deployRoute);
app.use(compileRoute);
app.use(authRoute);
app.use(verifyRoute);
app.use(contractRoute);

const PORT = process.env.PORT || 8085;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    server.listen(PORT, async (error) => {
        if (error) {
            return console.error(error);
        }
        console.log(`Server started on port ${PORT}`);
    });
})
