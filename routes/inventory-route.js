// Needed Resources 
const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities")
const invController = require("../controllers/invController");


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassification);

// Route to build vehicle view
router.get("/detail/:inventory_id", invController.buildByVehicle);


// Management Route
router.get("/management", invController.buildManagerView);

// Builds classification register
router.get("/add-class", invController.buildClassRegister);
router.post("/add-class", invController.registerNewClassification);

// Builds vehicle registration
router.get("/add-vehicle", invController.buildVehicleRegister);
router.post("/add-vehicle", invController.registerNewVehicle);


module.exports = router;