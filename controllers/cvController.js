
const fs = require("fs");
const cvModel = require("../models/cvModel");
const path = require("path");
class cvController{
    // ADD CV
    static addCv = async(req, res)=>{
        try {
            const file = req.file;
            console.log(file)
            const cv = await cvModel({
                name: file.filename
            }).save();
            return res.status(201).send({succcess: true, message: "CV added successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).send({succcess: false, message: "Something Wrong"});
        }
    }

     // ADD CV
     static updateCV = async(req, res)=>{
        try {
            const file = req.file;
            const id = "65a7dcd4804bd30fe219cfad";
            const cv = await cvModel.findByIdAndUpdate(id , {
                name: file.filename
            });

            fs.unlink(path.join(process.cwd(), `uploads/${cv.name}`), () => {
                console.log('file Deleted')
            })


            
            return res.status(201).send({success: true, message: "CV Updated successfully"});
        } catch (error) {
            console.log(error);
            return res.status(500).send({succcess: false, message: "Something Wrong"});
        }
    }

    // GET CV
    static getCv = async (req, res)=>{
        try {
            const cv = await cvModel.findOne();
            return res.status(200).send({success: true, message: "Get CV", cv});
        } catch (error) {
            console.log(error);
            return res.status(500).send({succcess: false, message: "Internal server error."});
        }
    }
    
}

module.exports = cvController