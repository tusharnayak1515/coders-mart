const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
import { setCookie } from "cookies-next";
import connectToMongo from "../../../../db";
const secret = process.env.JWT_SECRET;

import Seller from "../../../../models/Seller";

const schema = joi.object({
    email: joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
    password: joiPassword
            .string()
            .required()
            .messages({
                'password.required': '{#label} cannot be empty!',
            })
});

const handler = async (req, res)=> {
    if(req.method === "POST") {
        connectToMongo();
        let success = false;
        try {
            const {email, password} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let seller = await Seller.findOne({email: email});
            if(!seller) {
                success = false;
                return res.json({success, error: "No account found with this email!"});
            }

            const passwordCompare = await bcrypt.compare(password, seller.password);
            if(!passwordCompare) {
                success = false;
                return res.json({success, error: "Incorrect Password!"});
            }

            const data = {
                user: {
                    id: seller.id,
                    role: seller.role
                }
            }

            const authToken = jwt.sign(data, secret);
            setCookie("cm_seller_token", authToken, {req, res, maxAge: 60*60*24*7});
            
            success = true;
            return res.status(201).json({success});

        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

export default handler;