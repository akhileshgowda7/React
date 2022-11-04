const express = require('express');
const products = require('./data/products');

const app = express(); //initializing express

app.get('/', (req, res) => {
  res.send('API is Runnning');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5001, console.log('Server running on port 50001'));
