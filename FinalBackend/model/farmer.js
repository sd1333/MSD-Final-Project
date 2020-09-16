const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const Schema = mongoose.Schema
const farmerSchema = new Schema({
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
        default: 'farmer'
    },
    activated: {
        type: Boolean,
        required: true,
        default: true
    },
    // products: [
    //     {
    //         productName: {
    //             type: String
    //         },
    //         price: {
    //             type: Number
    //         },
    //         qty: {
    //             type: Number
    //         }
    //     }
    // ]
    // ,
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    // orders: [
    //     {
    //         orderId: ObjectID,
    //         customer: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Customer',
    //             required: true
    //         },
    //         status: {
    //             type: String,
    //             required: true,
    //             default: 'pending'
    //         },
    //         orderProductIds: [Number]
    //     }
    // ]
})

farmerSchema.methods.deleteSingleProduct = async function (productId) {
    const farmerId = this._id

    await this.model('Farmer')
        .findOne({ _id: ObjectID(farmerId) })
        .then(async (farmer) => {
            farmer.products = farmer.products
                .filter((item) => {
                    return item._id != productId
                })
            await farmer.save()
        })
}


module.exports = mongoose.model('Farmer', farmerSchema)