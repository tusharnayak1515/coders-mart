import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import Seller from "../../../models/Seller";
import User from "../../../models/User";
import Order from "../../../models/Order";

const schema = joi.object({
    products: joi.array().min(1).required().messages({
        'products.min': '{#label} should contain at least {#min} product!',
        'products.required': '{#label} cannot be empty!',
    }),
    destination: joi.object().keys({
        street: joi.string().required(),
        city: joi.string().required(),
        destrict: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        pincode: joi.number().required()
    }).required().messages({
        'destination.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const userId = req.user.id;
            const {products,destination} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"})
            }

            let price = 0;
            products.forEach((product)=> {
                price += product.price;
            });

            products.forEach(async (product)=> {
                let sellerId = product.seller.toString();
                let seller = await Seller.findById(sellerId);
                let earning = seller.earning;
                seller = await Seller.findByIdAndUpdate(sellerId, {earning: (earning+product.price)}, {new: true});
            });

            let date = new Date();

            const neworder = await Order.create({
                products,
                destination,
                price,
                date: new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000)),
                user: userId
            });
            
            const orders = await Order.find({user: userId});

            success = true;
            return res.status(200).json({success, orders});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("createOwn","products",handler));