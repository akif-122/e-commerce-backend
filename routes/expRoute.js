const expController = require("../controllers/expController");
const auth = require("../middlewares/auth");

const router = require("express").Router();


router.post("/add-exp", auth, expController.add);
router.get("/get-exp", expController.getExp);
router.get("/get-single-exp/:id", expController.getSingleExp);
router.put("/update-exp/:id", auth, expController.updateExp);
router.delete("/delete-exp/:id", auth, expController.deleteExp);


module.exports = router