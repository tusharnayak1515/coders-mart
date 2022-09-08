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
            required: true
        },
        city: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending"
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