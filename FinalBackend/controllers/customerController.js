const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID;

const Customer = require('../model/customer')
const Order = require('../model/order')
const Product = require('../model/product');
const Farmer = require('../model/farmer')

const nodemailer = require('nodemailer');
const { response } = require('express');


exports.rateFarmer = async (req, res, next) => {
    console.log('req.body: ', req.body)
    console.log('req.params.id: ', req.params.id)

    const rating = req.body.rating
    const farmerId = req.params.id


    if (rating == 3) {
        const doc = await Farmer.findByIdAndUpdate(
            { _id: farmerId },
            { $inc: { rating: 1 } })
            .then((result) => {

            })

        res.status(200).json(doc)
    }
    if (rating == 1) {
        const doc = await Farmer.findByIdAndUpdate(
            { _id: farmerId },
            { $inc: { rating: -1 } })
            .then((result) => {

            })

        res.status(200).json(doc)
    }



}


exports.getOrders = async (req, res, next) => {
    const myCustomer = req.user
    const getMethod = req.params.method

    console.log('viewOrders req.user: ', req.user)
    console.log('req.params.method: ', req.params.method)

    let docs;

    if (getMethod == 'all') {
        docs = await Order.find({ 'customer._id': myCustomer._id })
    }

    if (getMethod == 'pending') {
        docs = await Order.find({ $and: [{ "customer._id": myCustomer._id }, { status: getMethod }] })
    }

    if (getMethod == 'ready') {
        docs = await Order.find({ $and: [{ "customer._id": myCustomer._id }, { status: getMethod }] })
    }

    if (getMethod == 'complete') {
        docs = await Order.find({ $and: [{ "customer._id": myCustomer._id }, { status: getMethod }] })
    }

    if (getMethod == 'bydate') {
        // docs = await Order.aggregate([
        //     { $match: { "customer._id": myCustomer._id } },
        //     { $sort: { _id: -1 } }])

        docs = await Order.find({ "customer._id": myCustomer._id })
            .sort({ _id: -1 })
    }

    console.log('DOCS: ', docs)
    res.status(200).json(docs)
}

exports.createOrder = async (req, res, next) => {





    const myFarmer = req.body[0].farmer
    const myCustomer = req.user

    console.log('farmer: ', myFarmer)
    console.log('customer: ', myCustomer)

    const products = req.body.map((item) => {
        const { _id, product, ...farmer } = item
        // console.log('farmer from map: ', farmer)
        // console.log('product from map: ', product)
        // console.log('_id from map: ', _id)

        const prodObj = {
            _id: _id,
            price: product.price,
            productName: product.productName,
            qty: product.qty
        }
        return prodObj;

    })
    // console.log('products: ', products)

    const newOrder = new Order({
        farmer: myFarmer,
        customer: myCustomer,
        products: products
    })

    console.log('newOrder: ', newOrder)


    newOrder.save((err, orderDoc) => {
        if (err) {
            res.status(200).json({
                success: false
            })
        } else {

            console.log('ORDERDOCSAVE: ', orderDoc)

            console.log("orderDoc.products: ", orderDoc.products)

            for (let i = 0; i < orderDoc.products.length; i++) {
                Product.updateOne(
                    { _id: orderDoc.products[i]._id },
                    { $inc: { "product.qty": -1 } }
                ).then((err, doc) => {
                    console.log("Updated doc?: ", doc)
                })
            }


            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'simplyfreshfarmcooperative@gmail.com',
                    pass: 'simplyfresh123456'
                }
            })


            transporter.sendMail(
                {
                    from: 'simplyfreshfarmcooperative@gmail.com',
                    to: `${orderDoc.farmer.email}`,
                    subject: `New order confirmation`,
                    text: `
                        `,
                    html: `
                        <h3> Hi ${orderDoc.farmer.firstName} </h3>
                        <p> Hooray Farmer! You have a new order from ${orderDoc.customer.firstName} <br>
                            Please login to view this order. <br>
                            order# ${orderDoc._id}
                        </p>

                        `
                }, function (err, data) {
                    if (err) {
                        console.log('error has happenend: ', err)
                    } else {
                        console.log('email sent!!!!')
                    }
                })

            transporter.sendMail(
                {
                    from: 'simplyfreshfarmcooperative@gmail.com',
                    to: `${orderDoc.customer.email}`,
                    subject: `New order confirmation`,
                    text: `

                        `,
                    html: `
                        <h3> Hi ${orderDoc.customer.firstName}</h3>
                        <p> Your order has been placed! <br> 
                        Please allow at least one business day for the merchant to prepare your order <br>
                        order# ${orderDoc._id} 
                        </p>

                        `
                }, function (err, data) {
                    if (err) {
                        console.log('error has happenend: ', err)
                    } else {
                        console.log('email sent!!!!')
                    }
                })



            res.status(200).json({
                success: true,
                message: "Saved successfully"
            })
        }
    })





}


exports.getFarmers = async (req, res, next) => {

    const farmers = await Farmer.find()

    let passLessFarmers = farmers.map((item) => {

        const { ...plFarmer } = item
        const { passwordhash, ...passLessFarmer } = plFarmer._doc

        // console.log('...passLessFarmer: ', passLessFarmer)
        return { ...passLessFarmer }
    })

    // console.log('passLessFarmers: ', passLessFarmers)

    res.status(200).json(passLessFarmers)
}




exports.getFarmerProducts = async (req, res, next) => {


    const farmerId = req.params.id

    console.log('getFarmerProducts farmerId: ', farmerId)


    const products = await Product.find({ "farmer._id": farmerId })

    res.status(200).json(products)


    // Product.find({ "farmer._id": farmerId }, (err, doc) => {
    //     res.status(200).json(doc)
    // })

}










            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'simplyfreshfarmcooperative@gmail.com',
            //         pass: 'simplyfresh123456'
            //     }
            // })

            // let mailOptions = {
            //     from: 'simplyfreshfarmcooperative@gmail.com',
            //     to: `sdaudi@mum.edu, shawndaudi@gmail.com`,
            //     subject: `New order confirmation`,
            //     text: `
            //     <h3> Order </h3>
            //     <p> Your order is ready for pick up on:   </p>
            //     `,
            //     html: `
            //     <h3> Hi </h3>
            //     <p>   </p>

            //     `
            // }

            // transporter.sendMail(mailOptions, function (err, data) {
            //     if (err) {
            //         console.log('error has happenend: ', err)
            //     } else {
            //         console.log('email sent!!!!')
            //     }
            // })






    //    [
    //     {
    //       _id: 5f08bf918e80bc8024cf3662,
    //       productId: 5f07ac6aac1d2c6f4c6a0dbf,
    //       productName: 'BUTTER',
    //       qty: 1
    //     },
    //     {
    //       _id: 5f08bf918e80bc8024cf3663,
    //       productId: 5f08bf328e80bc8024cf3660,
    //       productName: 'MILK',
    //       qty: 2
    //     }
    //   ]






    // SOLD OUT ITEMS LOGIC.  

    // console.log('req.body: ', req.body)

    // const prodArr = req.body
    // let soldOutProds;

    // for (let elem of prodArr) {
    //     let doc = await Product.find({ $and: [{ _id: elem._id }, { "product.qty": { $lt: 1 } }] })
    //     if (doc) {
    //         soldOutProds = [soldOutProds, ...doc]
    //     }
    // }

    // console.log('SoldOUTPRODS: ', soldOutProds)

    // let tempArr = [...prodArr, ...soldOutProds]



    // const customerId = req.user._id
    // const customerName = req.user.firstName

    // const { cart, ...customerDetails } = req.user

    // const orderDetails = {
    //     customer: customerDetails,
    //     ...req.body
    // }

    // // console.log("req.body: ", req.body)
    // // console.log("orderDetails: ", orderDetails)
    // const newOrder = new Order({ ...orderDetails, products: orderDetails.products })

    // // console.log("newOrder: ", newOrder)


    // newOrder.save((err, orderDoc) => {
    //     if (err) {
    //         res.status(200).json({
    //             success: false
    //         })
    //     } else {

    //         console.log('ORDERDOCSAVE: ', orderDoc)

    //         console.log("orderDoc.products: ", orderDoc.products)

    //         for (let i = 0; i < orderDoc.products.length; i++) {
    //             Product.updateOne(
    //                 { _id: orderDoc.products[i].productId },
    //                 { $inc: { "product.qty": -orderDoc.products[i].qty } }
    //             ).then((err, doc) => {
    //                 console.log("Updated doc?: ", doc)
    //             })
    //         }


    //         let transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'simplyfreshfarmcooperative@gmail.com',
    //                 pass: 'simplyfresh123456'
    //             }
    //         })


    //         transporter.sendMail(
    //             {
    //                 from: 'simplyfreshfarmcooperative@gmail.com',
    //                 to: `${orderDoc.farmer.email}`,
    //                 subject: `New order confirmation`,
    //                 text: `
    //                     `,
    //                 html: `
    //                     <h3> Hi ${orderDoc.farmer.firstName} </h3>
    //                     <p> Hooray Farmer! You have a new order from ${orderDoc.customer.firstName} <br>
    //                         Please login to view this order. <br>
    //                         order# ${orderDoc._id}
    //                     </p>

    //                     `
    //             }, function (err, data) {
    //                 if (err) {
    //                     console.log('error has happenend: ', err)
    //                 } else {
    //                     console.log('email sent!!!!')
    //                 }
    //             })

    //         transporter.sendMail(
    //             {
    //                 from: 'simplyfreshfarmcooperative@gmail.com',
    //                 to: `${orderDoc.customer.email}`,
    //                 subject: `New order confirmation`,
    //                 text: `

    //                     `,
    //                 html: `
    //                     <h3> Hi ${orderDoc.customer.firstName}</h3>
    //                     <p> Your order has been placed! <br> 
    //                     Please allow at least one business day for the merchant to prepare your order <br>
    //                     order# ${orderDoc._id} 
    //                     </p>

    //                     `
    //             }, function (err, data) {
    //                 if (err) {
    //                     console.log('error has happenend: ', err)
    //                 } else {
    //                     console.log('email sent!!!!')
    //                 }
    //             })



    //         res.status(200).json({
    //             success: true,
    //             message: "Saved successfully"
    //         })
    //     }
    // })
