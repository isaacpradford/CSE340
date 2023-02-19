// Needed Resources 
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassification);

// Route to build vehicle view
router.get("/detail/:inventory_id", invController.buildByVehicle);

module.exports = router;