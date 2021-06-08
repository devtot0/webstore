import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config();

connectDB();

const app = express();

//that will allow us to accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
})

//endpoints
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});


//MIDDLEWARES
const _dirname = path.resolve();
//making the folder static and taking to the uploads folder
app.use("uploads", express.static(path.join(_dirname, "/uploads")));
app.use(notFound);
app.use(errorHandler);

app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running IN ${process.env.NODE_ENV} mode on port ${5000}`));