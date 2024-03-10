const express = require("express");
const contactController = require("../controllers/contactController");
const auth = require("../middlewares/auth");

const contactRoute = express.Router();

contactRoute.post("/contact", contactController.addContact)
contactRoute.get("/all-contact", contactController.allContact)
contactRoute.delete("/delete-contact/:id", contactController.deleteContact)

module.exports = contactRoute;