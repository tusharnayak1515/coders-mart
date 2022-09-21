import connectToMongo from "../../../db";

import Product from "../../../models/Product";
import Seller from "../../../models/Seller";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const productId = req.query.product;
            if(productId.length != 24) {
                success = false;
                return res.json({success, error: "Invalid product Id"});
            }
            
            let product = await Product.findById(productId);
            if(!product) {
                success = false;
                return res.json({success, error: "Product not found!"})
            }

            product = await Product.findById(productId)
                .populate("seller", "_id name");

            success = true;
            return res.status(200).json({success, product});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default handler;