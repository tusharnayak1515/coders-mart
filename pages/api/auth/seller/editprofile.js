import grantAccess from "../../../../middlewares/grantAccess";
import fetchUser from "../../../../middlewares/fetchUser";
import connectToMongo from "../../../../db";
import { setCookie } from "cookies-next";
import joi from "joi";

import Seller from "../../../../models/Seller";

const schema = joi.object({
    name: joi.string().min(3).max(25).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!',
        'name.required': '{#label} cannot be empty!',
    }),
    email: joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
    address: joi.object().keys({
        street: joi.string(),
        city: joi.string(),
        district: joi.string(),
        state: joi.string(),
        country: joi.string(),
        pincode: joi.number()
    }).required().messages({
        'address.required': '{#label} cannot be empty!',
    }),
    phone: joi.number().optional()
});

const handler = async (req, res)=> {
    if(req.method === "PUT") {
        connectToMongo();
        let success = false;
        try {
            const sellerId = req.user.id;
            const {name,email,phone,address} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let seller = await Seller.findById(sellerId);
            if(!seller) {
                success = false;
                return res.json({success, error: "Seller not found"});
            }

            seller = await Seller.findOne({email: email});
            if(seller) {
                if(seller._id.toString() !== sellerId) {
                    success = false;
                    return res.json({success, error: "This email is already linked to another account!"});
                }
            }

            seller = await Seller.findByIdAndUpdate(sellerId, {name: name, email: email}, {new: true})
                .select("-password");

            setCookie("cm_seller_profile",JSON.stringify(seller), {req, res, maxAge: 60*60*24*7});
            
            success = true;
            return res.status(201).json({success});

        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

export default fetchUser(grantAccess("updateOwn", "profile", handler));