const mongoose = require("mongoose");
const MongoUri = process.env.MONGO_URI;

const connectToMongo = ()=> {
    try {
        mongoose.connect(MongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> {
            console.log("Connected to MongoDB successfully!");
        });
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}

module.exports = connectToMongo;