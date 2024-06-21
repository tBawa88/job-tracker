import express from 'express'
import { createRequire } from 'module'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
const require = createRequire(import.meta.url);
import mongoose from 'mongoose';
import jobRouter from './routes/job.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import checkUserLoggedIn from './middleware/checkAuth.js';
import 'express-async-errors' //to handle the async erros (no need to use trycatch)

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

//connecting to mongo using global await
try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to DB')
} catch (error) {
    console.log("Error while connecting to mongo db ->>>>>", error)
}
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

//routes
app.get('/', (req, res) => { res.send('hello world') })
app.use('/api/jobs', jobRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', checkUserLoggedIn, userRouter)


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