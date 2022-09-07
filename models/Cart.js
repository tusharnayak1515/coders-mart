const mongoose = require("mongoose");
const {Schema} = mongoose;

const CartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

module.exports = Cart;