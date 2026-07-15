// It does not know how to create a user , it only knows who should handle the request
const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
