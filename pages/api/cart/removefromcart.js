import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import Product from "../../../models/Product";
import Cart from "../../../models/Cart";
import User from "../../../models/User";

const schema = joi.object({
    id: joi.string().length(24).required().messages({
        'id.length': '{#label} must be of {#length} characters!',
        'id.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {id} = req.body;
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

            let product = await Product.findById(id);
            if(!product) {
                success = false;
                return res.json({success, error: "Product not found!"});
            }

            product = await Product.findById(id)
                .populate("seller", "_id name");

            let cart = await Cart.findOne({user: userId});

            if(!cart.products.includes(product._id)) {
                success = false;
                return res.json({success, error: "This product is not present in the cart!"})
            }

            cart = await Cart.findByIdAndUpdate(cart._id.toString(), {$pull: {products: id}}, {new: true});

            success = true;
            return res.status(200).json({success, cart});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateOwn","cart",handler));