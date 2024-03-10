const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const otpGenerator = require('otp-generator')

const nodemailer = require("nodemailer");


const sendOTP = (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    const options = {
        from: process.env.USER,
        to: email,
        subject: "Verify your Account",
        html: `Enter this OTP <b>${otp}</b> to verify your account`
    }

    transporter.sendMail(options, (error) => {
        if (error) {
            console.log(error);

        } else {
            console.log("Verification mail sent to your account " + email);
        }
    })


}



const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All field are required"
            })
        }

        // existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already registered!"
            })
        }


        const hashPass = await bcrypt.hash(password, 10);

        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        sendOTP(otp, email)

        const user = await userModel({
            name,
            email,
            password: hashPass,
            otp: otp,
            createAt: Date.now(),
            expireAt: Date.now() + 60000
        });

        const saveUser = await user.save();

        return res.status(201).send({
            success: true,
            message: "Registeration Successful!",
            saveUser
        })


    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Something Wrong"
        })
    }
}


// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email or Password is incorrect!"
            })
        };

        // checking user
        const checkUser = await userModel.findOne({ email });
        if (!checkUser) {
            return res.status(400).send({
                success: false,
                message: "User not Found"
            })
        }

        const passMatch = await bcrypt.compare(password, checkUser.password);

        if (!passMatch) {
            return res.status(400).send({
                success: false,
                message: "Password is Inccorrect!"
            })
        }

        if (!checkUser.verified) {
            return res.status(400).send({
                success: false,
                message: "Your are not verified!"
            })
        }

        const token = await jwt.sign({ _id: checkUser._id }, process.env.SECRET_KEY);

        checkUser.tokens = checkUser.tokens.concat({ token: token })

        await checkUser.save()

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
            checkUser
        })

    } catch (error) {
        console.log(error)
    }
}

const otpVerify = async (req, res) => {
    try {
        const { otp } = req.body;

        const user = await userModel.findOne({ otp: otp });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "OTP is Incorrect"
            })
        }

        if (user.expireAt < Date.now()) {
            console.log("Your OTP is expired")
            return res.status(400).send({
                success: false,
                message: "Your OTP is Expired"
            })
        } else {
            const verifiedUser = await userModel.findByIdAndUpdate({ _id: user._id }, { otp: "none", verified: "true" }, { new: true })
            return res.status(200).send({
                success: true,
                message: "OTP Verification Successful!",
                verifiedUser
            })
        }


    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "OTP is Incorrect"
        })
        console.log(error)

    }
}

const addToCart = async (req, res) => {
    try {
        let { e, user } = req.body;
        let item = JSON.stringify(e);

        // item = { ...item, qty: 1 };

        // console.log(item)


        let userCart = await userModel.findOne({ _id: user })
        userCart.cart = userCart.cart.concat({ item: item })

        console.log(userCart)


        // console.log(userCart)

        // checkUser.tokens = checkUser.tokens.concat({ token: token })

        await userCart.save()





    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    registerUser,
    loginUser,
    otpVerify,
    addToCart
}