import grantAccess from "../../../../middlewares/grantAccess";
import fetchUser from "../../../../middlewares/fetchUser";
import connectToMongo from "../../../../db";

import User from "../../../../models/User";

const handler = async (req, res)=> {
    if(req.method === "GET") {
        connectToMongo();
        let success = false;
        try {
            const userId = req.user.id;
            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found"});
            }

            user = await User.findById(userId)
                .select("-password");
            
            success = true;
            return res.status(201).json({success,user});

        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

export default fetchUser(grantAccess("readOwn", "profile", handler));