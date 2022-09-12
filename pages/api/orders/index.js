import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import Order from "../../../models/Order";
import User from "../../../models/User";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const userId = req.user.id;
            let orders = await Order.find({user: userId});
            
            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"})
            }

            orders.forEach( async (order)=> {
                let date = new Date();
                if(new Date(date.getTime()) - order.date >= 0) {
                    await Order.findByIdAndUpdate(order._id.toString(), {status: "delivered"}, {new: true});
                }
            });

            orders = await Order.find({user: userId})
                .populate("products")
                .populate("user", "_id name phone email")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, orders});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readOwn", "orders", handler));