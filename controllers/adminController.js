const adminModel = require("../models/adminRegister");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
class adminController {

    static admin = async (req, res) => {
        try {
            const admin = await adminModel.findOne();
            return res.status(200).send({ success: true, message: "Admin", admin });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, message: "Something Wrong!" });
        }
    }
    static register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const isAdmin = await adminModel.findOne();
            if (isAdmin) {
                return res.status(201).send({
                    success: false,
                    message: "Admin is already Registered.."
                })
            }

            const admin = await adminModel({
                name, email, password
            }).save()

            return res.status(201).send({
                success: true,
                message: "Admin Registered"
            })

        } catch (error) {
            res.send(error.message)
        }
    }


    static login = async (req, res) => {
        try {
            const { password } = req.body;

            const user = await adminModel.findOne();

            const compare = await bcrypt.compare(password, user.password);
            if (!compare) {
                return res.status(400).send({
                    success: false,
                    message: "Authorization failed!"
                })
            }
            const token =  jwt.sign({ id: user._id }, process.env.LOGIN_SECRET);
            user.tokens = user.tokens.concat({ token: token });

            await user.save();

            // const decode = await jwt.verify(token, process.env.LOGIN_SECRET);
            const isAuth = await adminModel.findOne().select("-password -tokens")
            return res.status(200).send({
                success: true,
                message: "Admin Authorized!",
                token,
                isAuth
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ success: false, message: "Internal Server Error." });
        }
    }

    // UPDATE
    static update = async (req, res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            const { name, headLine, email, phone, dob, address, about, git, in: linkedIn, fb } = req.body;
            if (req.file) {
                const user = await adminModel.findOneAndUpdate({ email: email }, {
                    name,
                    headLine,
                    email,
                    phone,
                    dob,
                    address,
                    about,
                    git,
                    in: linkedIn,
                    fb,
                    profile: req.file.filename

                })
                fs.unlink(path.join(process.cwd(), `uploads/${user.profile}`), () => {
                    console.log('file Deleted')
                })
    
            } else {
                const user = await adminModel.findOneAndUpdate({ email: email }, {
                    name,
                    headLine,
                    email,
                    phone,
                    dob,
                    address,
                    about,
                    git,
                    in: linkedIn,
                    fb

                });
            }
            const user = await adminModel.findOne().select("-password -tokens");
            return res.status(200).send({ success: true, message: "Profile Updated!" , user});
        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Something Wrong!" });
        }
    }

    // LOGOUT 
    static logout = async (req, res) => {
        try {
            const user = req.user;
            const utoken = req.token;
            user.tokens = user.tokens.filter(token => token.token !== utoken);
            user.tokens = [];
            await user.save();
            res.status(200).send({ success: true, message: "Logout Successful!" });

        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: "Something Wrong!" });
        }


    }

    // CHANGE PASSWORD
    static changePass = async (req, res) => {
        try {
            const { oldPass, newPass } = req.body;
            if (!oldPass) {
                return res.status(400).send({ success: false, message: "Old Password is Required!" });
            }
            if (!newPass) {
                return res.status(400).send({ success: false, message: "New Password is Required!" });
            }

            const hashPass = await bcrypt.hash(newPass, 10);

            const user = await adminModel.findOne();

            const oldMatch = await bcrypt.compare(oldPass, user.password);
            if (!oldMatch) {
                return res.status(400).send({ success: false, message: "Old Password is Incorrect!" });
            }

            const verify = await bcrypt.compare(newPass, user.password);


            if (verify) {
                return res.status(400).send({ success: false, message: "Old and New Password should not be same!" });
            }
            const updated = await adminModel.findByIdAndUpdate(user._id, { password: hashPass });

            return res.status(200).send({ success: true, message: "Password Updated!" })


        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, message: "Something wrong!" })
        }
    }

}


module.exports = adminController;