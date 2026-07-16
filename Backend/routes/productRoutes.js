const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.post('/', createProduct);

router.get('/', getProducts);   // get all products

router.get('/:id', getProduct);  // get one product

router.put('/:id',updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
