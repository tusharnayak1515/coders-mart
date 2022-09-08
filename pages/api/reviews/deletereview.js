import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import Review from "../../../models/Review";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "DELETE") {
        let success = false;
        try {
            const userId = req.user.id;
            const reviewId = req.query.review;

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }

            let myreview = await Review.findById(reviewId);
            if(!myreview) {
                success = false;
                return res.json({success, error: "Review not found!"});
            }

            if(userId !== myreview.user.toString()) {
                success = false;
                return res.json({success, error: "You are not allowed to perform this task"});
            }

            const productId = myreview.product.toString();

            myreview = await Review.findByIdAndDelete(reviewId, {new: true});
            
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
 
export default fetchUser(grantAccess("deleteOwn","reviews",handler));