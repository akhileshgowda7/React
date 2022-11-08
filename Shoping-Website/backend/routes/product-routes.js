import express from 'express';
import Product from '../models/productModel';
import asyncHandler from 'express-async-handler ';
import { useParams } from 'react-router-dom';

const router = express.Router();
const params = useParams();

//@desc  Fetch all products
//@route GET /api/products
//@access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const product = await Product.find({}); //empty object gives everything
    res.json();
  })
);

//@desc  Fetch single product
//@route GET /api/products/:id
//@access Public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

export default router;
