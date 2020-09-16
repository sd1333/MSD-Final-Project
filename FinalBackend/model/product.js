const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    farmer: {

        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        rating: {
            type: Number
        }
    },
    product:
    {

        productName: {
            type: String,
        },
        price: {
            type: Number
        },
        qty: {
            type: Number
        }
    }
})

module.exports = mongoose.model('Product', productSchema)