const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

router.post('/api/auth/register', validate, authController.register);
router.post('/api/auth/login', validate, authController.login);
router.post('/api/auth/logout', validate, authController.logout);

module.exports = router;