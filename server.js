import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'
//routes
import jobRouter from './routes/job.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
//path to public
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path';

import 'express-async-errors' //to handle the async erros (no need to use trycatch)

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDNRY_NAME,
    api_key: process.env.CLOUDNRY_API_KEY,
    api_secret: process.env.CLOUDNRY_API_SECRET,
});

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './Frontend/dist')))
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to DB')
} catch (error) {
    console.log("Error while connecting to mongo db ->>>>>", error)
}


//routes
app.get('/', (req, res) => { res.send('hello world') })
app.use('/api/jobs', jobRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './Frontend/dist', 'index.html'))
})
//404 route catcher MW
app.use('*', (req, res, next) => {
    res.status(404).json({ success: false, message: 'Resource not found' });
})

//error catcher MW
app.use((err, req, res, next) => {
    console.log("Something went wrong on the server", err)
    const status = err.status || 500;
    const message = err.message || 'Something went wrong'
    const errors = err.errors || undefined;
    res.status(status).json({ success: false, message, errors })
})

const port = process.env.PORT || 5100
app.listen(port, () => console.log("Server running on port", port))