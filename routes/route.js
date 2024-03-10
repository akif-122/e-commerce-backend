const express = require("express");
const { registerUser, loginUser, otpVerify, addToCart } = require("../controller/userController");

const router = express.Router();
router.get("/", (req, res)=>{
    res.status(200).send({"name": "Hello"})
})
router.post("/register", registerUser)

router.post("/login", loginUser)
router.post("/otp", otpVerify)
router.post("/addtocart", addToCart)

module.exports = router;