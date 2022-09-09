import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import User from "../../../models/User";
import Review from "../../../models/Review";

const schema = joi.object({
    ratings: joi.number().min(1).max(5).required().messages({
        'ratings.min': '{#label} should be at least {#min}!',
        'ratings.max': '{#label} should be at most {#max}!',
        'ratings.required': '{#label} cannot be empty!',
    }),
    review: joi.string().min(5).max(100).required().messages({
        'review.min': '{#label} should contain at least {#min} characters!',
        'review.max': '{#label} should contain at most {#max} characters!',
        'review.required': '{#label} cannot be empty!',
    }),
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
            const {ratings, review, id} = req.body;
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

            if(userId !== myreview.user.toString()) {
                success = false;
                return res.json({success, error: "You are not allowed to perform this task"});
            }

            myreview = await Review.findByIdAndUpdate(id, {ratings: ratings, review: review}, {new: true});
            
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
 
export default fetchUser(grantAccess("updateOwn","reviews",handler));