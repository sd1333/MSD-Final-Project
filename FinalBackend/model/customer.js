const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const Schema = mongoose.Schema
const customerSchema = new Schema({
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
    passwordhash: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)

// cart: [
//     {
//         productId: {
//             type: Schema.Types.ObjectID,
//             ref: 'Product',
//             required: true
//         },
//         qty: {
//             type: Number,
//             required: true
//         }
//     }
// ]