import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import Seller from "../../../models/Seller";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product";

const schema = joi.object({
    products: joi.array().min(1).required().messages({
        'products.min': '{#label} should contain at least {#min} product!',
        'products.required': '{#label} cannot be empty!',
    }),
    destination: joi.object().keys({
        street: joi.string().required(),
        city: joi.string().required(),
        district: joi.string().required(),
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

            let myproducts = [];
            for (let i = 0; i < products.length; i++) {
                let p = await Product.findById(products[i].toString());
                if(!p) {
                    success = false;
                    return res.json({success, error: "Product not found!"});
                }
                myproducts.push(p);
            }

            let price = 0;
            myproducts.forEach((product)=> {
                price += product.price;
            });

            for (let i = 0; i < myproducts.length; i++) {
                let product = myproducts[i];
                let sellerId = product.seller.toString();
                let seller = await Seller.findById(sellerId);
                let earning = seller.earning + product.price;
                seller = await Seller.findByIdAndUpdate(sellerId, {earning: earning}, {new: true});
            }

            let date = new Date();

            await Order.create({
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
 
export default fetchUser(grantAccess("createOwn","orders",handler));