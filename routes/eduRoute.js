const eduController = require("../controllers/eduController");
const auth = require("../middlewares/auth");
const router = require("express").Router();


router.post("/add-edu", auth, eduController.add);
router.get("/get-edu", eduController.getEdu);
router.get("/get-single-edu/:id", eduController.getSingleEdu);
router.put("/update-edu/:id", auth, eduController.updateEdu);
router.delete("/delete-edu/:id", auth, eduController.deleteEdu);


module.exports = router