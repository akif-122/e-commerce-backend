const mongoose = require("mongoose");

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection Successful!")
    } catch (error) {
        console.log("Connection Failed")
    }
}

module.exports = Connection;