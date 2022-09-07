import connectToMongo from "../../../db";
const joi = require("joi");

import Otp from "../../../models/Otp";

const schema = joi.object({
    otp: joi.string().required().messages({
                'otp.required': '{#label} cannot be empty!',
    }),
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const {otp} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.json({success, error: error.details[0].message});
            }

            const myotp = await Otp.findOne({otp: otp});
            if(!myotp) {
                success = false;
                return res.json({success, error: "Incorrect otp"})
            }

            success = true;
            return res.json({success, myotp});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default handler;