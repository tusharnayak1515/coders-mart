import connectToMongo from "../../../../db";
import fetchUser from "../../../../middlewares/fetchUser";
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
import bcrypt from "bcryptjs";
import grantAccess from "../../../../middlewares/grantAccess";

import User from "../../../../models/User";

const schema = joi.object({
    oldpassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'oldpassword.min': '{#label} should contain at least {#min} characters!',
                'oldpassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'oldpassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'oldpassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'oldpassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'oldpassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'oldpassword.required': '{#label} cannot be empty!',
            }),
    newpassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'newpassword.min': '{#label} should contain at least {#min} characters!',
                'newpassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'newpassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'newpassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'newpassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'newpassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'newpassword.required': '{#label} cannot be empty!',
            }),
    confirmpassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'confirmpassword.min': '{#label} should contain at least {#min} characters!',
                'confirmpassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'confirmpassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'confirmpassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'confirmpassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'confirmpassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'confirmpassword.required': '{#label} cannot be empty!',
            }),
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {oldpassword,newpassword,confirmpassword} = req.body;
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

            if(oldpassword === newpassword) {
                success = false;
                return res.json({success, error: "New password should be different from old password!"});
            }

            if(newpassword !== confirmpassword) {
                success = false;
                return res.json({success, error: "New password and confirm password do not match!"});
            }
            
            const passwordCompare = await bcrypt.compare(oldpassword, user.password);
            if(!passwordCompare) {
                success = false;
                return res.json({success, error: "Old password is incorrect!"});
            }

            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(newpassword, salt);

            user = await User.findByIdAndUpdate(userId, {password: securedPassword}, {new: true})
                .select("-password");

            success = true;
            return res.status(200).json({success});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateOwn", "password", handler));