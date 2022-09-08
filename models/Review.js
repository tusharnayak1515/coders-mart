const mongoose = require("mongoose");
const {Schema} = mongoose;

const ReviewSchema = new Schema({
    ratings: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        default: null
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
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