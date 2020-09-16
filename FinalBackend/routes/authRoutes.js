const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.get('/', authController.test)
router.post('/farmersignup', authController.farmerSignup)
router.post('/farmersignin', authController.farmerSignin)

router.post('/customersignup', authController.customerSignup)
router.post('/customersignin', authController.customerSignin)

module.exports = router