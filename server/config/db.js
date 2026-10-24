const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);

        console.log("database connected");
    } catch (error) {
        console.log("connection error", error);
    }
};

module.exports = connectDb;