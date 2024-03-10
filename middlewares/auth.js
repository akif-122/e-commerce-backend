const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminRegister");

const auth = async (req, res, next) => {
    try {
        const decode = await jwt.verify(req.headers.authorization, process.env.LOGIN_SECRET);
        const user = await adminModel.findOne({ _id: decode.id });
        const letss = user.tokens.filter(token => token.token === req.headers.authorization);
        // console.log(user.tokens[0].token === req.headers.authorization);
        console.log(letss);
        if (letss) {
            req.user = user;
            req.token = req.headers.authorization;
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Authentication Failed", error })
    }
}

module.exports = auth;