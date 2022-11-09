import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/product-routes.js';

dotenv.config();

connectDB();

const app = express(); //initializing express

app.get('/', (req, res) => {
  res.send('API is Runnning');
});

app.use('/api/poducts', productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
