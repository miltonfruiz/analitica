const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const authenticate = require('../middleware/auth');

router.get('/api/analytics', authenticate, controller.getAll);
router.get('/api/analytics/:id', authenticate, controller.getById);
router.post('/api/analytics', authenticate, controller.create);
router.put('/api/analytics/:id', authenticate, controller.update);
router.delete('/api/analytics/:id', authenticate, controller.delete);

router.get('/api/charts', authenticate, controller.getAll);
router.get('/api/charts/:id', authenticate, controller.getById);
router.post('/api/charts', authenticate, controller.create);
router.put('/api/charts/:id', authenticate, controller.update);
router.delete('/api/charts/:id', authenticate, controller.delete);

module.exports = router;