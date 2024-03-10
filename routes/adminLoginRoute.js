const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");

const path = require("path")
const multer = require("multer");
const uploads = path.join(process.cwd(), "uploads")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploads)
    },
    filename: (req, file, cb) => {
        cb(null, "profile-" + Date.now() + path.extname(file.originalname))
    }
})

const uplaod = multer({
    storage: storage
})


const adminRoute = express.Router();

adminRoute.get("/admin/admin", adminController.admin)
adminRoute.post("/admin/register", adminController.register)
adminRoute.put("/admin/update", uplaod.single("profile"), adminController.update)
adminRoute.post("/admin/login", adminController.login)
adminRoute.post("/admin/change-pass", adminController.changePass);
adminRoute.get("/admin/logout", auth, adminController.logout)


module.exports = adminRoute;
