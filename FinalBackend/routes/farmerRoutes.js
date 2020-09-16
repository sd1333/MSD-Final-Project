const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authenticationMiddleware')
const farmerController = require('../controllers/farmerController')
const { Router } = require('express')

router.get('/farmer', authMiddleware.authenticateFarmer, farmerController.getProducts)

router.get('/farmer/orders', authMiddleware.authenticateFarmer, farmerController.getOrders)

router.get('/farmer/order/:id', authMiddleware.authenticateFarmer, farmerController.getOrder)

router.get('/farmer/orders/bystatus/:status', authMiddleware.authenticateFarmer, farmerController.viewByStatus)

router.patch('/farmer/orderstatus/:id', authMiddleware.authenticateFarmer, farmerController.updateOrderStatus)

router.get('/farmer/:id', authMiddleware.authenticateFarmer, farmerController.getProduct)

router.patch('/farmer/:id', authMiddleware.authenticateFarmer, farmerController.updateProduct)

router.post('/farmer', authMiddleware.authenticateFarmer, farmerController.addProduct)

router.delete('/farmer/:id', authMiddleware.authenticateFarmer, farmerController.deleteProduct)

router.get('/superuser/getfarmers', authMiddleware.authenticateSuperUser, farmerController.sugetFarmers)

router.get('/superuser/getcustomers', authMiddleware.authenticateSuperUser, farmerController.sugetCustomers)

router.patch('/superuser/farmeractivationtoggle', authMiddleware.authenticateSuperUser, farmerController.farmerActivationToggle)

router.patch('/superuser/customeractivationtoggle', authMiddleware.authenticateSuperUser, farmerController.customerActivationToggle)

router.get('/superuser/getfarmer/:id', authMiddleware.authenticateSuperUser, farmerController.getFarmer)

router.get('/superuser/getcustomer/:id', authMiddleware.authenticateSuperUser, farmerController.getCustomer)

router.patch('/superuser/farmer/:id', authMiddleware.authenticateSuperUser, farmerController.patchNewPassword)

router.patch('/superuser/customer/:id', authMiddleware.authenticateSuperUser, farmerController.patchCustNewPassword)

router.get('/superuser/transactions', authMiddleware.authenticateSuperUser, farmerController.getTransactions)

router.get('/superuser/order/:id', authMiddleware.authenticateSuperUser, farmerController.getOrder)

router.get('/superuser/requestlog', authMiddleware.authenticateSuperUser, farmerController.viewRequestLog)




module.exports = router