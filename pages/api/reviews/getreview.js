import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Review from "../../../models/Review";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const userId = req.user.id;
            const reviewId = req.query.review;
            
            const user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found"});
            }

            const review = await Review.findById(reviewId)
                .populate("user", "_id name");

            success = true;
            return res.status(200).json({success, review});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readAny", "reviews", handler));