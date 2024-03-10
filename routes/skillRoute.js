const skillController = require("../controllers/skillController");
const auth = require("../middlewares/auth");

const skillRouter = require("express").Router();

skillRouter.get("/all-skill", skillController.getSkill)
skillRouter.post("/add-skill", auth, skillController.addSkill)
skillRouter.put("/edit-skill/:id", auth, skillController.editSkill)
skillRouter.delete("/delete-skill/:id", auth, skillController.deleteSkill)

module.exports = skillRouter