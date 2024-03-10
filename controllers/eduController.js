const eduModel = require("../models/eduModel");

class eduController {
    static add = async (req, res) => {
        try {

            const { name, org, date, desc } = req.body

            if (!name || !org || !date || !desc) {
                return res.status(400).send({
                    success: false,
                    message: "All Fields are Required",
                })
            }

            const edu = await eduModel(req.body).save();
            const education = await eduModel.find();

            if (edu) {
                return res.status(201).send({
                    success: true,
                    message: "Education Added...",
                    edu : education
                })
            }



        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in adding Education..",
                error
            })
        }
    }


    // GETTING ALL EDUCATION
    static getEdu = async (req, res) => {
        try {

            const edu = await eduModel.find();
            return res.status(200).send({
                success: true,
                message: "All Education..",
                edu
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in getting  Education..",
                error
            })
        }
    }

    // GETTING SINGLE Education
    static getSingleEdu = async (req, res) => {
        try {
            const { id } = req.params;
            const edu = await eduModel.findOne({ _id: id });
            return res.status(200).send({
                success: true,
                message: "Education..",
                edu
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in getting  Education..",
                error
            })
        }
    }


    // UPDATE EDUCATION
    static updateEdu = async (req, res) => {
        try {

            const { id } = req.params;
            const edu = await eduModel.findByIdAndUpdate(id, req.body);
            const education = await eduModel.find();

            if (edu) {
                return res.status(200).send({
                    success: true,
                    message: "Education Updated.",
                    edu: education
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in Updating  Education..",
                error
            })
        }
    }


    // DELETE EDUCATION
    static deleteEdu = async (req, res) => {
        try {

            const { id } = req.params;
            const edu = await eduModel.findByIdAndDelete(id);
            const education = await eduModel.find();
            if (edu) {
                return res.status(200).send({
                    success: true,
                    message: "Deleted.",
                    edu: education

                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in Deleting..",
                error
            })
        }
    }


}

module.exports = eduController