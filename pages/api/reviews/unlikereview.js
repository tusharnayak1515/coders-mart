import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import User from "../../../models/User";
import Review from "../../../models/Review";

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
                return res.json({success, error: "User not found!"});
            }

            let myreview = await Review.findById(id);
            if(!myreview) {
                success = false;
                return res.json({success, error: "Review not found!"});
            }
            
            const productId = myreview.product.toString();

            let count = 0;
            myreview.likes.forEach((user1)=> {
                if(user1.toString() === userId) {
                    count += 1;
                }
            });
            
            if(count === 0) {
                success = false;
                return res.json({success, error: "You cannot unlike a review which you have not liked!"});
            }

            myreview = await Review.findByIdAndUpdate(id, {$pull: {likes: userId}}, {new: true});
            
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
 
export default fetchUser(grantAccess("createOwn","likes",handler));