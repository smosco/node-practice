// model 별로 route 분리
const express = require('express');
const Product = require('../models/productModel');
const {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
