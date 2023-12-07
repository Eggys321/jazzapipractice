const express = require('express');
const { createProduct,insertMany, deleteMany, deleteProduct, updateProduct, singleProduct, allProducts, getProductCategory } = require('../controllers/productController');
const router = express.Router();


// create many products route

router.post('/products/many',insertMany );

// create a product

router.post('/products/product',createProduct);

// delete all products

router.delete('/products/many',deleteMany);

// delete product
router.delete('/products/:productId',deleteProduct);

// update product
router.patch('/products/:productId',updateProduct);

// single product
router.get('/products/product',singleProduct);

// all products
router.get('/products/products',allProducts);

// all products by category
router.get('/products/:productCategory',getProductCategory);

module.exports = router;