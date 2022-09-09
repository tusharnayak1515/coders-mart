import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import joi from "joi";

import Product from "../../../models/Product";
import Seller from "../../../models/Seller";

const schema = joi.object({
    id: joi.string().length(24).required().messages({
        'id.length': '{#label} should contain be of {#min} characters!',
        'id.required': '{#label} cannot be empty!',
    }),
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
    if(req.method === "PUT") {
        let success = false;
        try {
            const sellerId = req.user.id;
            const {id,name,description,brand,price,category,quantity,gender,size,image} = req.body;
            const {error} = schema.validate({id,name,description,brand,price,category,quantity});
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let seller = await Seller.findById(sellerId);
            if(!seller) {
                success = false;
                return res.json({success, error: "Seller not found!"})
            }

            let product = await Product.findById(id);
            if(!product) {
                success = false;
                return res.json({success, error: "Product not found!"})
            }

            if(sellerId !== product.seller.toString()) {
                success = false;
                return res.json({success, error: "You are not allowed to perform this task"});
            }

            let myproduct = null;
            if(category === "clothing") {
                if((gender in ["men","women","unisex"]) && (size in ["xs","s","m","l","xl","xxl","free"])){
                    myproduct = {
                        id: id,
                        description: description,
                        brand: brand,
                        price: parseInt(price),
                        category: category,
                        quantity: quantity,
                        gender: gender,
                        size: size,
                        image: image
                    }
                }
                else {
                    success = false;
                    if(!gender in ["men","women","unisex"]) {
                        return res.json({success, error: "Invalid gender!"});
                    }
                    else {
                        return res.json({success, error: "Invalid size!"});
                    }
                }
            }
            else {
                myproduct = {
                    id: id,
                    description: description,
                    brand: brand,
                    price: parseInt(price),
                    category: category,
                    quantity: quantity,
                    image: image
                }
            }

            product = await Product.findByIdAndUpdate(id, myproduct, {new: true});
            
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
 
export default fetchUser(grantAccess("updateOwn","products",handler));