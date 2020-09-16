const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectID = require('mongodb').ObjectID;
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')


const Farmer = require('../model/farmer')
const Product = require('../model/product')
const Order = require('../model/order')
const Customer = require('../model/customer')

const mongoose = require('mongoose')

const nodemailer = require('nodemailer')
const moment = require('moment')

exports.viewRequestLog = async (req, res, next) => {


    const requestLogPath = path.join(__dirname, '../requests.log')
    console.log("requestLogPath: ", requestLogPath)


    const readRequestLogStream = fs.readFile(path.join(requestLogPath), { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            // console.log('received data===================: ' + data);

            const logsArray = data.split('::')
            console.log(logsArray)
            res.status(200).json(logsArray)

        } else {
            console.log(err);
        }

    })



    console.log('readRequestLogStream: ', readRequestLogStream)


    // const accessLogStream = fs.createWriteStream(
    //     path.join(__dirname, 'requests.log'),
    //     { flags: 'a' }
    // )



}

exports.getTransactions = async (req, res, next) => {
    console.log('transactions')

    const docs = await Order.find({}).sort({ _id: -1 })

    res.status(200).json(docs)
}

exports.patchNewPassword = async (req, res, next) => {
    const farmerId = req.params.id
    const newPassword = req.body.newPassword

    console.log('farmerId: ', farmerId)
    console.log('newPass: ', newPassword)

    const salt = await bcrypt.genSalt(5)
    newPasswordHash = await bcrypt.hash(newPassword, salt)

    Farmer.findByIdAndUpdate(
        { _id: farmerId },
        { $set: { passwordhash: newPasswordHash } },
        (err, doc) => {
            console.log('new pass doc: ', doc)
            res.status(200).json(doc)
        }
    )

}

exports.patchCustNewPassword = async (req, res, next) => {
    const customerId = req.params.id
    const newPassword = req.body.newPassword

    console.log('patchCustNewPassword')
    console.log('customerId: ', customerId)
    console.log('newPass: ', newPassword)

    const salt = await bcrypt.genSalt(5)
    newPasswordHash = await bcrypt.hash(newPassword, salt)
    console.log("newPasswordHash: ", newPasswordHash)

    Customer.findByIdAndUpdate(
        { _id: customerId },
        { $set: { passwordhash: newPasswordHash } },
        (err, doc) => {
            console.log('new pass doc: ', doc)
            res.status(200).json(doc)
        }
    )
}

exports.getCustomer = async (req, res, next) => {
    const customerId = req.params.id
    console.log("customerId: ", customerId)

    const customer = await Customer.findById(customerId)

    res.status(200).json(customer)
}

exports.getFarmer = async (req, res, next) => {
    const farmerId = req.params.id
    console.log("farmerId: ", farmerId)

    const farmer = await Farmer.findById(farmerId)

    res.status(200).json(farmer)

}

exports.customerActivationToggle = async (req, res, next) => {

    const customerId = req.body.id
    console.log("customerId: ", customerId)

    const customer = await Customer.findById(customerId)

    console.log('CUSTOMER.activated: ', customer.activated)

    let activationStatus = customer.activated

    console.log("activationStatus: ", activationStatus)

    Customer.findByIdAndUpdate({ _id: customerId }, { $set: { activated: !activationStatus } })
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Updated"
            })
        })
}


exports.farmerActivationToggle = async (req, res, next) => {

    const farmerId = req.body.id
    console.log("farmerId: ", farmerId)

    const farmer = await Farmer.findById(farmerId)

    let activationStatus = farmer.activated

    console.log("activationStatus: ", activationStatus)

    Farmer.findByIdAndUpdate({ _id: farmerId }, { $set: { activated: !activationStatus } })
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Updated"
            })
        })
}

exports.sugetFarmers = async (req, res, next) => {
    const farmers = await Farmer.find({})
    res.status(200).json(farmers)
}

exports.sugetCustomers = async (req, res, next) => {
    const customers = await Customer.find({})
    res.status(200).json(customers)
}

//converted
exports.getProducts = async (req, res, next) => {
    const farmerId = req.user._id
    Product.find({ "farmer._id": farmerId }, (err, doc) => {
        res.status(200).json(doc)
    })


    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'simplyfreshfarmcooperative@gmail.com',
    //         pass: 'simplyfresh123456'
    //     }
    // })

    // let mailOptions = {
    //     from: 'simplyfreshfarmcooperative@gmail.com',
    //     to: 'sdaudi@mum.edu',
    //     subject: 'Hi from NodeJSSS',
    //     text: 'email systems are working'
    // }

    // transporter.sendMail(mailOptions, function (err, data) {
    //     if (err) {
    //         console.log('error has happenend: ', err)
    //     } else {
    //         console.log('email sent!!!!')
    //     }
    // })

    // async function main() {
    //     // Generate test SMTP service account from ethereal.email
    //     // Only needed if you don't have a real mail account for testing
    //     // let testAccount = await nodemailer.createTestAccount();

    //     // create reusable transporter object using the default SMTP transport
    //     let transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: 'simplyfreshfarmcooperative@gmail.com', // generated ethereal user
    //             pass: 'simplyfresh123456', // generated ethereal password
    //         },
    //         // tls: {
    //         //     rejectUnauthorized: false
    //         // }
    //     });

    //     // send mail with defined transport object
    //     let info = await transporter.sendMail({
    //         from: '"Simply Fresh" <simplyfreshfarmcooperative@gmail.com>', // sender address
    //         to: "sdaudi@mum.edu", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>", // html body
    //     });

    //     console.log("Message sent: %s", info.messageId);
    //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //     // Preview only available when sending through an Ethereal account
    //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // }

    // main().catch(console.error);






}
//converted
exports.getProduct = async (req, res, next) => {
    const farmerId = req.user._id
    const productId = req.params.id

    console.log("req.params", req.params)
    console.log("productId: ", productId)

    const theProduct = await Product.findById(productId)
    if (theProduct) {
        res.status(200).json(theProduct)
    } else {
        res.status(200).json({
            success: false,
            message: "Not found"
        })
    }

}


//converted
exports.addProduct = async (req, res, next) => {
    const farmerId = req.user._id

    // console.log("req.user: ", req.user)

    let newProduct = new Product({
        farmer: req.user,
        product: req.body
    })
    console.log("req.body: ", req.body)
    console.log("newProduct: ", newProduct)

    await newProduct.save((err, doc) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Saved successfully"
            })
        }
    })

}

//convert
exports.updateProduct = async (req, res, next) => {
    console.log("updateproduct reached here")
    const farmerId = req.user._id
    const productId = req.params.id

    console.log("productId: ", productId)
    console.log("req.body: ", req.body)

    Product.updateOne(
        { _id: productId },
        { $set: { product: req.body } })
        .then((result) => {
            res.status(200).json(result)
        })

}


//converted
exports.deleteProduct = async (req, res, next) => {
    const farmerId = req.user._id
    const productId = req.params.id

    Product.findByIdAndDelete(productId)
        .then((response) => {
            console.log("response: ", response)
            res.status(200).json({
                success: true,
                message: "Deletion successful"
            })
        })
        .catch((err) => {
            console.log("Error", err)
        })
}

exports.getOrder = async (req, res, next) => {
    const orderId = req.params.id

    console.log('getOrder orderId: ', orderId)

    const doc = await Order.findById(orderId)

    if (doc) {
        console.log('doc: ', doc)
        res.status(200).json(doc)
    } else {
        res.status(200).json({ success: false })
    }
}

exports.getOrders = async (req, res, next) => {
    const farmerId = req.user._id

    console.log('GETORDERS: farmerId: ', farmerId)
    const docs = await Order.find({ "farmer._id": farmerId })

    res.status(200).json(docs)

    // if (!docs[0]) {
    //     res.status(404).json({
    //         success: false,
    //         message: "Not found"
    //     })
    // } else if (docs) {
    //     res.status(200).json(docs)
    // } else {
    //     res.status(404).json({
    //         success: false,
    //         message: "Not found"
    //     })
    // }

}

exports.updateOrderStatus = async (req, res, next) => {

    orderId = req.params.id
    // console.log("orderId: ", orderId)
    console.log("updateOrderStatus req.body", req.body)
    // console.log("===================================")

    const readydate = moment(req.body.readydate).format('MMMM Do YYYY')
    console.log('readydate: ', readydate)

    Order.findByIdAndUpdate(
        { _id: orderId },
        { $set: { status: req.body.status } })
        .then((result) => {
            res.status(200).json(result)
            console.log('result: ', result)

            // automatic email being sent here
            console.log("result.customer.email: ", result.customer.email)

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'simplyfreshfarmcooperative@gmail.com',
                    pass: 'simplyfresh123456'
                }
            })
            let mailOptions = {
                from: 'simplyfreshfarmcooperative@gmail.com',
                to: `${result.customer.email}`,
                subject: `Your order is ready!`,
                text: `
                <h3> Hi ${result.customer.firstName}</h3>
                <p> Your order is ready for pick up on: ${readydate}  </p>
                `,
                html: `
                <h3> Hi ${result.customer.firstName}</h3>
                <p> Your order is ready for pick up on: ${readydate}  </p>
                `
            }
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log('error has happenend: ', err)
                } else {
                    console.log('email sent!!!!')
                }
            })

        })





}

exports.viewByStatus = async (req, res, next) => {
    const farmerId = req.user._id
    const status = req.params.status

    console.log('farmerId: ', farmerId, 'status: ', status)
    // try {
    //     const docs = await Order.find({ $and: [{ farmerId: farmerId }, { status: status }] })
    // }
    // catch (error) {
    //     res.status(200).json({ success: false })
    // }

    const docs = await Order.find({ $and: [{ "farmer._id": farmerId }, { status: status }] })


    res.status(200).json(docs)






}















// exports.addProduct = async (req, res, next) => {
//     const farmerId = req.user._id
//     const farmer = await Farmer.findById(farmerId)

//     console.log("farmerId", farmerId)
//     console.log("farmer", farmer)

//     farmer.products.push(req.body.product)
//     await farmer.save((err, doc) => {
//         if (err) {
//             res.status(500).json({
//                 success: false,
//                 message: "Internal server error"
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "Saved successfully"
//             })
//         }
//     })
// }

// exports.getProducts = async (req, res, next) => {
//     const farmerId = req.user._id
//     const farmer = await Farmer.findById(farmerId)
//     res.status(200).json(farmer.products)
// }

// exports.getProduct = async (req, res, next) => {
//     const farmerId = req.user._id
//     const productId = req.params.id

//     const farmer = await Farmer.findById(farmerId)
//     const theProduct = farmer.products.filter((item) => {
//         return item._id == productId
//     })
//     res.status(200).json(theProduct)

// }

// exports.updateProduct = async (req, res, next) => {
//     console.log("updateproduct reached here")
//     const farmerId = req.user._id
//     const productId = req.params.id

//     Farmer.updateOne(
//         { _id: farmerId, "products._id": productId },
//         { $set: { "products.$": req.body } })
//         .then((result) => {
//             res.status(200).json({
//                 status: "successful",
//                 result: result
//             })
//         })
// }

// exports.deleteProduct = async (req, res, next) => {
//     const farmerId = req.user._id
//     const productId = req.params.id

//     const farmer = await Farmer.findById(farmerId)

//     if (!farmer) {
//         res.status(401).json({
//             success: "false",
//             message: "User not found"
//         })
//     }

//     await farmer.deleteSingleProduct(productId)
//         .then((result) => {
//             console.log(result)
//             res.status(200).json({ message: "Product deletion successful" })
//         })
//         .catch(() => {
//             console.log("Error")
//         })
// }

   // if (!docs[0]) {
    //     res.status(200).json({
    //         success: false,
    //         message: "Not found"
    //     })
    // } else if (docs) {
    //     res.status(200).json(docs)
    // } else {
    //     res.status(200).json({
    //         success: false,
    //         message: "Not found"
    //     })
    // }

    // {
    //     "farmer": {
    //         "_id": "5f077ecc475f956cac27c3b5",
    //         "firstName": "Albert",
    //         "lastName": "Diaz",
    //         "email": "a@a.com",
    //         "rating": 0
    //     },
    //     "products" : [
    //        {
    //            "_id": "5f0f5255b06d35a55cd8b25e", 
    //            "productName": "Lettuce",
    //            "price": 3,
    //            "qty": 3
    //        },
    //         {
    //            "_id": "5f0f59a2e176f6abd80bf305", 
    //            "productName": "Cucumbers",
    //            "price": 2,
    //            "qty": 3
    //        }
    //     ]
    // }