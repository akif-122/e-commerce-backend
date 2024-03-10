const expModel = require("../models/expModel");

class expController {
    static add = async (req, res) => {
        try {

            const { name, org, date, desc } = req.body

            if (!name || !org || !date || !desc) {
                return res.status(400).send({
                    success: false,
                    message: "All Fields are Required",
                })
            }

            const exp = await expModel(req.body).save();
            const experience = await expModel.find();
            if (exp) {
                return res.status(201).send({
                    success: true,
                    message: "Experience Added...",
                    exp: experience
                })
            }



        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in adding experience..",
                error
            })
        }
    }


    // GETTING ALL EXPERIENCE
    static getExp = async (req, res) => {
        try {

            const exp = await expModel.find();
            return res.status(200).send({
                success: true,
                message: "All experience..",
                exp
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in getting  experience..",
                error
            })
        }
    }

    // GETTING SINGLE EXPERIENCE
    static getSingleExp = async (req, res) => {
        try {
            const { id } = req.params;
            const exp = await expModel.findOne({ _id: id });
            return res.status(200).send({
                success: true,
                message: "Experience..",
                exp
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in getting  experience..",
                error
            })
        }
    }


    // DELETE EXPERIRENCE
    static updateExp = async (req, res) => {
        try {

            const { id } = req.params;
            const exp = await expModel.findByIdAndUpdate(id, req.body);
            const experience = await expModel.find();

            if (exp) {
                return res.status(200).send({
                    success: true,
                    message: "Experience Updated.",
                    exp: experience
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in Updating  experience..",
                error
            })
        }
    }


    // DELETE EXPERIRENCE
    static deleteExp = async (req, res) => {
        try {

            const { id } = req.params;
            const exp = await expModel.findByIdAndDelete(id);
            const experience = await expModel.find();

            if (exp) {
                return res.status(200).send({
                    success: true,
                    message: "Experience Deleted.",
                    exp: experience

                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in Deleting  experience..",
                error
            })
        }
    }


}

module.exports = expController