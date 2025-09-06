const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// All order routes require authentication
router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getUserOrders);
router.get('/my-sales', authMiddleware, orderController.getUserSales);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);


module.exports = router;
