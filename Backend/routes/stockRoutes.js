const express = require('express');
const router = express.Router();

const {
    addStock,
    removeStock,
    getStock,
    allStock
} = require('../controllers/stockController');

router.post('/', addStock);
router.delete('/', removeStock);
router.get('/', allStock);
router.get('/:productId', getStock);

module.exports = router;
