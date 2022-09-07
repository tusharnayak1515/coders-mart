const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        require: true
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
    role: {
        type: String,
        default: "user",
        enum: ["user"]
    },
    createdAt: Number,
    updatedAt: Number
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;