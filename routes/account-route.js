// Needed Resources
const express = require("express");
const router = new express.Router();
const util = require("../utilities");
const accController = require("../controllers/accountController.js");

// Post route to post form information
router.post('/register', accController.registerClient)

router.get("/login", accController.buildLogin);
router.get("/register", accController.buildRegister);

module.exports = router;