const express = require('express');
const router = express.Router();

const {
    getAllHistory,
    getHistoryByProduct,
} = require('../controllers/historyController');

router.get('/', getAllHistory);
router.get('/product/:productId', getHistoryByProduct);

module.exports = router;
