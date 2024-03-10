const mogoose = require("mongoose");

const userSchema = mogoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
    },
    expireAt: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    cart: [
        {
            item: {
                type: String,

            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,

            }
        }
    ]
});

const userModel = mogoose.model("User", userSchema);

module.exports = userModel;