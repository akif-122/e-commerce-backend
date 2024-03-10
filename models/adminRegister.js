const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    profile: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    headLine: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    about: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    fb: {
        type: String,
        trim: true,
    },
    git: {
        type: String,
        trim: true,
    },
    in: {
        type: String,
        trim: true,
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]

})

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;