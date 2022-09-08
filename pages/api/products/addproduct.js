import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import Product from "../../../models/Product";
import Seller from "../../../models/Seller";

const schema = joi.object({
    name: joi.string().min(3).max(25).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!',
        'name.required': '{#label} cannot be empty!',
    }),
    description: joi.string().min(5).max(100).required().messages({
        'description.min': '{#label} should contain at least {#min} characters!',
        'description.max': '{#label} should contain at most {#max} characters!',
        'description.required': '{#label} cannot be empty!',
    }),
    brand: joi.string().required().messages({
        'brand.required': '{#label} cannot be empty!',
    }),
    price: joi.string().required().messages({
        'price.required': '{#label} cannot be empty!',
    }),
    category: joi.string().valid('electronics','eyecare','books','clothing').required().messages({
        'category.valid': 'Inavlid {#label}',
        'category.required': '{#label} cannot be empty!',
    }),
    quantity: joi.number().min(1).required().messages({
        'quantity.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const sellerId = req.user.id;
            const {name,description,brand,price,category,quantity,gender,size,image} = req.body;
            const {error} = schema.validate({name,description,brand,price,category,quantity});
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let seller = await Seller.findById(sellerId);
            if(!seller) {
                success = false;
                return res.json({success, error: "Seller not found!"})
            }

            let productDetails = null;

            if(category === "clothing") {
                if((gender in ["men","women","unisex"]) && (size in ["xs","s","m","l","xl","xxl","free"])){
                    productDetails = {
                        name,
                        description,
                        brand,
                        price: parseInt(price),
                        category,
                        quantity: quantity,
                        gender: gender,
                        size: size,
                        image: image ? image : "https://cdn1.vectorstock.com/i/thumb-large/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg",
                        seller: sellerId
                    }
                }
            }
            else {
                productDetails = {
                    name,
                    description,
                    brand,
                    price: parseInt(price),
                    category,
                    quantity: quantity,
                    image: image ? image : "https://cdn1.vectorstock.com/i/thumb-large/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg",
                    seller: sellerId
                }
            }

            const newproduct = await Product.create(productDetails);
            
            const products = await Product.find()
                .populate("seller", "_id name");

            success = true;
            return res.status(200).json({success, products});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("createOwn","products",handler));