import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import Cart from "../../../models/Cart";
import Product from "../../../models/Product";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const userId = req.user.id;
            let cart = await Cart.findOne({user: userId})

            for (let i = 0; i < cart.products.length; i++) {
                let product = await Product.findById(cart.products[i].toString());
                if(!product) {
                    cart = await Cart.findByIdAndUpdate(cart._id.toString(), {$pull: {products: cart.products[i].toString()}}, {new: true});
                }
            }

            cart = await Cart.findById(cart._id.toString())
                .populate("products");

            success = true;
            return res.status(200).json({success, cart});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readOwn", "cart", handler));