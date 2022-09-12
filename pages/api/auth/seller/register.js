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
    name: joi.string().min(3).max(25).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!',
        'name.required': '{#label} cannot be empty!',
    }),
    email: joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
    password: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'password.min': '{#label} should contain at least {#min} characters!',
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'password.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'password.noWhiteSpaces': '{#label} should not contain white spaces!',
                'password.required': '{#label} cannot be empty!',
            })
});

const handler = async (req, res)=> {
    if(req.method === "POST") {
        connectToMongo();
        let success = false;
        try {
            const {name, email, password} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let seller = await Seller.findOne({email: email});
            if(seller) {
                success = false;
                return res.json({success, error: "This email is already linked to another account!"});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            seller = await Seller.create({
                name,
                email,
                password: hashedPassword
            });

            const data = {
                user: {
                    id: seller.id,
                    role: seller.role
                }
            }

            const authToken = jwt.sign(data,secret);
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