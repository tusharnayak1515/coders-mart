const mongoose = require("mongoose");
const {Schema} = mongoose;

const ReviewSchema = new Schema({
    ratings: {
        type: Number,
        require: true
    },
    review: {
        type: String,
        default: null
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

module.exports = Review;