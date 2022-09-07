const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        enum: ["men","women","unisex"]
    },
    size: {
        type: String,
        enum: ["xs","s","m","l","xl","xxl","free"]
    },
    images: [
        {
            type: String,
            default: null
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Seller"
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;