const mongoose = require("mongoose");

const expSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

const expModel = mongoose.model("Experience", expSchema);

module.exports = expModel