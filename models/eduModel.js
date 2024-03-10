const mongoose = require("mongoose");

const eduSchema = mongoose.Schema({
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

const eduModel = mongoose.model("Education", eduSchema);

module.exports = eduModel