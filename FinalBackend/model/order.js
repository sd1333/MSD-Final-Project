const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const Schema = mongoose.Schema

const orderSchema = new Schema({

    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    farmer: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }
    },
    customer: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },

    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
            },
            price: {
                type: Number
            },
            productName: {
                type: String
            },
            qty: {
                type: Number
            }
        }
    ]
})

//farmer._id

module.exports = mongoose.model('Order', orderSchema)