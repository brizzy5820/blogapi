const express = require('express');
const router = express.Router();
const {getAllProducts,getId, createProduct, updateProduct, deleteProduct} = require('../Controllers/productController');
// Get all products
router.get('/', getAllProducts);
router.get('/:id', getId);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
module.exports = router; 
