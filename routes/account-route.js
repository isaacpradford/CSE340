// Needed Resources
const express = require("express");
const router = new express.Router();
const util = require("../utilities");
const accController = require("../controllers/accountController.js");

router.get("/login", accController.buildLogin);

module.exports = router;