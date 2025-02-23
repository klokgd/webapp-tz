const express = require('express');
const UserControllers = require('../controllers/userControllers');
const router = express.Router();

router.patch('/:userId/balance', UserControllers.validateUpdateBalance, UserControllers.updateBalance);

module.exports = router;