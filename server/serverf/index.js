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

const app = express();
const server = http.createServer(app);

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type']
};

app.use(cors(corsOptions));

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
