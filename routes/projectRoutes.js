const express = require("express");
const projectController = require("../controllers/projectController");
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


const projectRouter = express.Router();


projectRouter.post("/add-project", auth, uplaod.single("image"), projectController.addProject);
projectRouter.put("/edit-project/:id", auth, uplaod.single("image"), projectController.editProject);
projectRouter.delete("/delete-project/:id", auth, projectController.deleteProject);
projectRouter.get("/single-project/:id", projectController.singleProject);
projectRouter.get("/all-project", projectController.allProjects);



module.exports = projectRouter;