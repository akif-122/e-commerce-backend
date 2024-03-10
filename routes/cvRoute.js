const express = require("express");
const cvController = require("../controllers/cvController");
const cvRouter = express.Router(); 
const multer = require("multer");
const path = require("path");
const uploadPath = path.join(process.cwd(), "uploads");
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploadPath)
    }, 
    filename : (req, file, cb)=>{
        cb(null, "CV-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

cvRouter.post("/add-cv", upload.single("cv"), cvController.addCv);
cvRouter.get("/get-cv", cvController.getCv);
cvRouter.put("/update-cv", upload.single("cv"), cvController.updateCV);

module.exports = cvRouter;