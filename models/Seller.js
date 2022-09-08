const mongoose = require("mongoose");
const {Schema} = mongoose;

const SellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    address: {
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
    earning: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "seller",
        enum: ["seller"]
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

module.exports = Seller;