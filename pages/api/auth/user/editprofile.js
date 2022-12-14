import grantAccess from "../../../../middlewares/grantAccess";
import fetchUser from "../../../../middlewares/fetchUser";
import connectToMongo from "../../../../db";
import joi from "joi";

import User from "../../../../models/User";

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
        street: joi.string().allow(""),
        city: joi.string().allow(""),
        district: joi.string().allow(""),
        state: joi.string().allow(""),
        country: joi.string().allow(""),
        pincode: joi.number().allow("")
    }).required().messages({
        'address.required': '{#label} cannot be empty!'
    }),
    phone: joi.number().allow(null,"").messages({
        'phone.number': '{#label} must be of type number!'
    })
});

const handler = async (req, res)=> {
    if(req.method === "PUT") {
        connectToMongo();
        let success = false;
        try {
            const userId = req.user.id;
            const {name,email,phone,address} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found"});
            }

            user = await User.findOne({email: email});
            if(user) {
                if(user._id.toString() !== userId) {
                    success = false;
                    return res.json({success, error: "This email is already linked to another account!"});
                }
            }

            user = await User.findByIdAndUpdate(userId, {name: name, email: email, phone: phone === "" ? null : phone, address: address}, {new: true})
                .select("-password");
            
            success = true;
            return res.status(201).json({success, user});

        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

export default fetchUser(grantAccess("updateOwn", "profile", handler));