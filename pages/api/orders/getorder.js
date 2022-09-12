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
            const orderId = req.query.order;
            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"})
            }

            let order = await Order.findById(orderId);
            if(!order) {
                success = false;
                return res.json({success, error: "Order not found!"})
            }

            let date = new Date();
            if(new Date(date.getTime()) - order.date >= 0) {
                await Order.findByIdAndUpdate(order._id.toString(), {status: "delivered"}, {new: true});
            }

            order = await Order.findById(orderId)
                .populate("products")
                .populate("user", "_id name phone email")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, order});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readOwn", "orders", handler));