// Needed Resources
const express = require("express");
const router = new express.Router();
const regValidate = require('../utilities/account-validation')

const util = require("../utilities");
const accController = require("../controllers/accountController.js");

// Post route to post form information
router.post('/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    accController.registerClient)

router.get("/login", accController.buildLogin);
router.get("/register", accController.buildRegister);

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

module.exports = router;