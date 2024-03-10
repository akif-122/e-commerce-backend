const express = require("express");
const smProjectController = require("../controllers/smProjectController");
const path = require("path")
const multer = require("multer");
const auth = require("../middlewares/auth");
const uploads = path.join(process.cwd(), "uploads")
console.log(uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploads)
    },
    filename: (req, file, cb) => {
        cb(null, "project-" + Date.now() + path.extname(file.originalname))
    }
})

const uplaod = multer({
    storage: storage
})


const smProjectRouter = express.Router();


smProjectRouter.post("/add-sm-project", auth, uplaod.single("image"), smProjectController.addProject);
smProjectRouter.put("/edit-sm-project/:id", auth, uplaod.single("image"), smProjectController.editProject);
smProjectRouter.delete("/delete-sm-project/:id", auth, smProjectController.deleteProject);
smProjectRouter.get("/single-sm-project/:id", smProjectController.singleProject);
smProjectRouter.get("/all-sm-project", smProjectController.allProjects);



module.exports = smProjectRouter;