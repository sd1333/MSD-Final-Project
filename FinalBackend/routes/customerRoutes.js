const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authenticationMiddleware')
const customerController = require('../controllers/customerController')

router.post('/customer/createorder', authMiddleware.authenticateCustomer, customerController.createOrder)

router.get('/customer/farmers', authMiddleware.authenticateCustomer, customerController.getFarmers)

router.get('/customer/orders/:method', authMiddleware.authenticateCustomer, customerController.getOrders)

router.post('/customer/farmer/rating/:id', authMiddleware.authenticateCustomer, customerController.rateFarmer)

router.get('/customer/farmer/:id', authMiddleware.authenticateCustomer, customerController.getFarmerProducts)

module.exports = router