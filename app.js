require('dotenv').config({path: './config.env'});
require('express-async-errors');
const express = require('express');

const app = express();

//connectDB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

//routers
const authRouter = require('./Routes/authRoutes');
const jobsRouter = require('./Routes/jobsRoutes');
//Error handler

app.use(express.json());  //body parser

//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticateUser,jobsRouter);

const port = process.env.PORT || 3000;

const DB = process.env.MONGO_URI.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

const start = async() => {
    try{
        await connectDB(DB);
        app.listen(port,console.log('Server is listening'));
    }
    catch(err){
        console.log(err);
    }
};

start()