import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import Product from "../../../models/Product";
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
    productId: joi.string().length(24).required().messages({
        'productId.length': '{#label} must be of {#length} characters!',
        'productId.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const userId = req.user.id;
            const {ratings, review, productId} = req.body;
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

            let product = await Product.findById(productId);
            if(!product) {
                success = false;
                return res.json({success, error: "Product not found!"});
            }

            const newReview = await Review.create({
                ratings,
                review,
                product: productId,
                user: userId
            });
            
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
 
export default fetchUser(grantAccess("createOwn","reviews",handler));