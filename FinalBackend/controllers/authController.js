// Farmer_Backend_Authentication


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID;

const Farmer = require('../model/farmer')
const Customer = require('../model/customer')
const Super = require('../model/super')


exports.superUserSignIn = async (req, res, next) => {

    const { email, password } = req.body

    console.log('superusersignin')

    let superuser;

    console.log("req.body: ", req.body)

    await Super.findOne({ email: email }, (err, obj) => {
        superuser = obj
    })

    if (!superuser) {
        res.status(404).json({
            success: false,
            message: "Access denied"
        })
    }

    const isMatch = password == superuser.passwordhash

    if (!isMatch) {
        res.status(404).json({
            success: false,
            message: "Access denied"
        })
    }

    if (isMatch) {
        const { ...plFarmer } = farmer
        const { passwordhash, ...passLessFarmer } = plFarmer._doc
        console.log("passLessFarmer: ", passLessFarmer)

        const token = jwt.sign({ farmer: passLessFarmer }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })

        res.status(200).json({
            success: true,
            message: 'Successful',
            accessToken: token
        })
    }
}















exports.farmerSignup = async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body
    console.log(email)

    let farmer = await Farmer.findOne({ email: email })

    if (farmer) {
        res.status(409).json({
            success: false,
            message: 'Email in use'
        })
    } else {
        const newFarmer = new Farmer({
            firstName: firstName,
            lastName: lastName,
            email: email,
            passwordhash: password
        })

        console.log("newFarmer.passwordhash: ", newFarmer.passwordhash)

        const salt = await bcrypt.genSalt(5)
        console.log('salt: ', salt)
        newFarmer.passwordhash = await bcrypt.hash(newFarmer.passwordhash, salt)
        console.log('newFarmer.passwordhash: ', newFarmer.passwordhash)
        await newFarmer.save()
        res.status(201).json({
            success: true,
            message: 'Successful'
        })
    }

}

exports.farmerSignin = async (req, res, next) => {
    const { email, password } = req.body

    console.log('farmersignin')

    let farmer;

    console.log("req.body: ", req.body)

    await Farmer.findOne({ email: email }, (err, obj) => {
        farmer = obj
    })

    if (!farmer) {
        res.status(404).json({
            success: false,
            message: "Access denied"
        })
    }

    const isMatch = await bcrypt.compare(password, farmer.passwordhash)

    if (!isMatch) {
        res.status(404).json({
            success: false,
            message: "Access denied"
        })
    }

    if (isMatch) {
        const { ...plFarmer } = farmer
        const { passwordhash, ...passLessFarmer } = plFarmer._doc
        console.log("passLessFarmer: ", passLessFarmer)

        const token = jwt.sign({ farmer: passLessFarmer }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })

        res.status(200).json({
            success: true,
            message: 'Successful',
            accessToken: token
        })
    }
}







exports.customerSignup = async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body
    console.log(req.body)

    let customer = await Customer.findOne({ email: email })

    if (customer) {
        res.status(409).json({
            success: false,
            message: 'Email in use'
        })
    } else {
        const newCustomer = new Customer({
            firstName: firstName,
            lastName: lastName,
            email: email,
            passwordhash: password
        })

        console.log("newCustomer: ", newCustomer)
        console.log("newCustomer.passwordhash: ", newCustomer.passwordhash)

        const salt = await bcrypt.genSalt(5)
        newCustomer.passwordhash = await bcrypt.hash(newCustomer.passwordhash, salt)
        await newCustomer.save()
        res.status(201).json({
            success: true,
            message: 'Successful'
        })
    }
}

exports.customerSignin = async (req, res, next) => {
    const { email, password } = req.body

    let customer;

    console.log('req.body: ', req.body)

    await Customer.findOne({ email: email }, (err, obj) => {
        customer = obj
        console.log("obj: ", obj)
    })

    if (!customer) {
        console.log('meow1')

        res.status(404).json({
            success: false,
            message: "Access denied1"
        })
    }

    const isMatch = await bcrypt.compare(password, customer.passwordhash)

    if (!isMatch) {
        console.log('meow2')
        res.status(404).json({
            success: false,
            message: "Access denied2"
        })
    }

    if (isMatch) {
        const { ...plCustomer } = customer
        const { passwordhash, ...passLessCustomer } = plCustomer._doc
        console.log("passLessCustomer: ", passLessCustomer)

        const token = jwt.sign({ customer: passLessCustomer }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })

        res.status(200).json(token)
    }
}




exports.test = (req, res, next) => {
    res.status(200).json({ status: 'Hello' })
}