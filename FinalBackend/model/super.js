const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const Schema = mongoose.Schema
const superSchema = new Schema({
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
    role: {
        type: String,
        required: true,
        default: 'superuser'
    },

})

module.exports = mongoose.model('Super', superSchema)