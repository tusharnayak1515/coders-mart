import grantAccess from "../../../../middlewares/grantAccess";
import fetchUser from "../../../../middlewares/fetchUser";
import connectToMongo from "../../../../db";
import { setCookie } from "cookies-next";

import Seller from "../../../../models/Seller";

const handler = async (req, res)=> {
    if(req.method === "GET") {
        connectToMongo();
        let success = false;
        try {
            const sellerId = req.user.id;
            let seller = await Seller.findById(sellerId);
            if(!Seller) {
                success = false;
                return res.json({success, error: "Seller not found"});
            }

            seller = await Seller.findById(sellerId)
                .select("-password");

            setCookie("cm_seller_profile",JSON.stringify(seller), {req, res, maxAge: 60*60*24*7});
            
            success = true;
            return res.status(201).json({success, seller});

        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

export default fetchUser(grantAccess("updateOwn", "profile", handler));