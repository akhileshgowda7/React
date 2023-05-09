import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/product-routes.js';
import userRoutes from './routes/user-routes.js';
import { notFound, errorHandler } from './middleware/error-middleware.js';
import orderRoutes from './routes/order-routes.js'

dotenv.config();

connectDB();

const app = express(); //initializing express
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is Runnning');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
