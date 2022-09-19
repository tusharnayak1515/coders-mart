import connectToMongo from "../../../../db";
import grantAccess from "../../../../middlewares/grantAccess";
import fetchUser from "../../../../middlewares/fetchUser";

import Seller from "../../../../models/Seller";
import Product from "../../../../models/Product";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const sellerId = req.user.id;
            
            let seller = await Seller.findById(sellerId);
            if(!seller) {
                success = false;
                return res.json({success, error: "Seller not found!"})
            }

            const products = await Product.find({seller: sellerId})
                .populate("seller", "_id name")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, products});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readOwn", "store", handler));