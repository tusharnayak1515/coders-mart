const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["men","women","unisex"]
    },
    size: {
        type: String,
        enum: ["xs","s","m","l","xl","xxl","free"]
    },
    image: {
        type: String,
        default: "https://cdn1.vectorstock.com/i/thumb-large/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg"
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Seller"
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;