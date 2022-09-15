import connectToMongo from "../../../db";

import Product from "../../../models/Product";
import Seller from "../../../models/Seller";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const category = req.query.category;
            const categorisedProducts = await Product.find({category: category})
                .populate("seller", "_id name");

            success = true;
            return res.status(200).json({success, categorisedProducts});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default handler;