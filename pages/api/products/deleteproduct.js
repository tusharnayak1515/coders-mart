import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import Product from "../../../models/Product";
import Review from "../../../models/Review";
import Seller from "../../../models/Seller";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "DELETE") {
        let success = false;
        try {
            const sellerId = req.user.id;
            const productId = req.query.product;

            let seller = await Seller.findById(sellerId);
            if(!seller) {
                success = false;
                return res.json({success, error: "Seller not found!"})
            }

            let product = await Product.findById(productId);
            if(!product) {
                success = false;
                return res.json({success, error: "Product not found!"})
            }

            if(sellerId !== product.seller.toString()) {
                success = false;
                return res.json({success, error: "You are not allowed to perform this task"});
            }

            const reviews = await Review.find({product: productId});

            reviews.forEach(async (review)=> {
                await Review.findByIdAndDelete(review._id.toString(),{new: true});
            });

            product = await Product.findByIdAndDelete(productId, {new: true});
            
            const products = await Product.find()
                .populate("seller", "_id name")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, products});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteOwn","products",handler));