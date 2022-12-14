const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
import { getCookie } from 'cookies-next';

const fetchUser = (handler)=> {
    let success;
    return async (req,res)=> {
        let token = getCookie("cm_user_token",{req, res}) || req.headers.cm_user_token;
        if(!token) {
            token = getCookie("cm_seller_token",{req, res}) || req.headers.cm_seller_token;
        }
        
        if(!token) {
            success = false;
            return res.status(401).json({success, error: "You need to be logged in to access this route!"});
        }
        try {
            const data = jwt.verify(token, secret);
            req.user = data.user;
            return handler(req,res);
        } catch (error) {
            success = false;
            return res.json({success, error: error.message, status: 401});
        }
    }
}

export default fetchUser;