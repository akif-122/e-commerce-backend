const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
    name: {
        type: String,
    }
});

const cvModel = mongoose.model("CV", cvSchema );

module.exports = cvModel;