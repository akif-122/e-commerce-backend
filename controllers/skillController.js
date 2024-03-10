const { findByIdAndDelete } = require("../models/adminRegister");
const skillModel = require("../models/skill");

class skillController {

    // GET ALL SKILLS
    static getSkill = async (req, res) => {
        try {
            const skills = await skillModel.find();
            return res.status(200).send({
                success: true,
                message: "All Skills",
                skills
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in getting all Skills.",
                error
            })
        }
    }


    // ADD SKILL
    static addSkill = async (req, res) => {
        try {
            const { name, percentage } = req.body;

            if (!name) {
                return res.status(400).send({
                    success: false,
                    message: "Skill Name is required!"
                })
            }
            if (!percentage) {
                return res.status(400).send({
                    success: false,
                    message: "Skillset Percentage is required!"
                })
            }
            if ((percentage < 40) || (percentage > 100)) {
                return res.status(400).send({
                    success: false,
                    message: "Percentage should be between 40 & 100."
                })
            }
            const isSkill = await skillModel.findOne({ name: name });
            if (isSkill) {
                return res.status(400).send({
                    success: false,
                    message: "Skill Already exists."
                })
            }

            const skill = await skillModel({
                name: name,
                percentage: percentage
            }).save();

            const skills = await skillModel.find();

            return res.status(200).send({
                success: true,
                message: "Skill Added Successfully",
                skills

            })


        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "Erorr in adding skill",
                error
            })
        }
    }


    // EDIT SKILL
    static editSkill = async (req, res) => {
        try {

            const { id } = req.params;


            const { name, percentage } = req.body;

            if (!name) {
                return res.status(400).send({
                    success: false,
                    message: "Skill Name is required!"
                })
            }
            if (!percentage) {
                return res.status(400).send({
                    success: false,
                    message: "Skillset Percentage is required!"
                })
            }
            if ((percentage < 40) || (percentage > 100)) {
                return res.status(400).send({
                    success: false,
                    message: "Percentage should be between 40 & 100."
                })
            }


            const skill = await skillModel.findByIdAndUpdate(id, req.body);
            const skills = await skillModel.find();
            return res.status(200).send({
                success: true,
                message: "Skill Updated Successfully!",
                skills
            })


        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in Updating Skill.."
            })
        }
    }


    // DELETE SKILL
    static deleteSkill = async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id)
            const deleteSkill = await skillModel.findOneAndDelete({ _id: id });
            const skills = await skillModel.find();

            if (deleteSkill) {
                return res.status(200).send({
                    success: true,
                    message: "Skill Deleted!",
                    skills
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Error in Skill Deleting!"
            })
        }

    }


}

module.exports = skillController