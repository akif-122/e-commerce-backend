const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
})

const skillModel = mongoose.model("Skill", skillSchema);

module.exports = skillModel