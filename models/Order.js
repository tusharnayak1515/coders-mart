const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    destination: {
        street: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        district: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        pincode: {
            type: Number,
            default: null
        }
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports = Order;