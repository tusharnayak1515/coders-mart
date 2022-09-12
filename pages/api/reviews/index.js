import connectToMongo from "../../../db";

import Product from "../../../models/Product";
import Review from "../../../models/Review";
import User from "../../../models/User";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const productId = req.query.product;

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
 
export default handler;