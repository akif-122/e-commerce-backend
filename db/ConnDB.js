const mongoose = require("mongoose");


const ConnDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connection Successful!")
    } catch (error) {
        console.log("Connection Failed")
    }
}
module.exports = ConnDB