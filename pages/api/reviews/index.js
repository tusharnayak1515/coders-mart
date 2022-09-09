import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Product from "../../../models/Product";
import Review from "../../../models/Review";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const userId = req.user.id;
            const productId = req.query.product;
            
            const user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found"});
            }

            const product = await Product.findById(productId);
            if(!product) {
                success = false;
                return res.json({success, error: "Product not found"});
            }

            const reviews = await Review.find({product: productId})
                .populate("user", "_id name");

            success = true;
            return res.status(200).json({success, reviews});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readAny", "reviews", handler));