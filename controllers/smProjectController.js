const SmProjectModel = require("../models/smProjects");

const fs = require("fs");
const path = require("path");

class projectController {

    static addProject = async (req, res) => {

        console.log(req.file)
        const { name, desc, live, github, aos } = req.body

        try {
            const project = await SmProjectModel({
                name,
                image: req.file.filename,
                desc,
                live,
                github,
                aos
            })

            const saveProject = await project.save();
            const allProject = await SmProjectModel.find();
            if (saveProject) {
                return res.status(201).send({
                    success: true,
                    message: "Project Added Successfully",
                    allProject
                })
            }
        } catch (error) {
            console.log(error.message);

            return res.status(400).send({ message: "Something Wrong" })
        }

    }

    static allProjects = async (req, res) => {
        try {
            const allProject = await SmProjectModel.find();

            return res.status(200).send({ success: true, allProject });

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Somthing Wrong" })
        }
    }

    // GET SINGLE PROJECT
    static singleProject = async (req, res) => {
        try {
            const { id } = req.params;

            const project = await SmProjectModel.findOne({ _id: id });
            if (project) {
                return res.status(200).send({
                    success: true,
                    message: "Single Project",
                    project
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static editProject = async (req, res) => {
        try {

            const { name, desc, live, github, aos } = req.body
            const project1 = await SmProjectModel.findOne({ _id: req.params.id })
            if (!req.file) {
                const project = await SmProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
                const allProject = await SmProjectModel.find();

                return res.status(200).send({
                    success: true,
                    message: "Project updated",
                    allProject
                })
            } else {
                fs.unlink(path.join(process.cwd(), `uploads/${project1.image}`), () => {
                    console.log('file Deleted')
                })

                const project = await SmProjectModel.findByIdAndUpdate(req.params.id,
                    {
                        name: name,
                        image: req.file.filename,
                        desc: desc,
                        live: live,
                        github: github,
                        aos: aos
                    },
                    { new: true });
                const allProject = await SmProjectModel.find();


                return res.status(200).send({
                    success: true,
                    message: "Project updated",
                    allProject
                })
            }

        } catch (error) {
            console.log(error)
        }
    }


    // deleteProject
    static deleteProject = async (req, res) => {
        try {
            const { id } = req.params;
            const deleteProject = await SmProjectModel.findByIdAndDelete(id);

            if (deleteProject) {
                fs.unlink(path.join(process.cwd(), `uploads/${deleteProject.image}`), () => {
                    console.log('file Deleted')
                })
                const allProject = await SmProjectModel.find();

                
                return res.status(200).send({
                    success: true,
                    message: "Project Deleted",
                    allProject
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = projectController;