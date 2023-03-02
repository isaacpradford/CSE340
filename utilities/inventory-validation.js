const utilities = require("./")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.classRegistrationRules = () => {
    return [
      // valid email is required and cannot already exist in the DB
      body("classification_name")
      .isLength({ min: 3 })
      .isAlpha()
      .trim()
      .withMessage("A valid classification name is required.")
      .custom(async (classification_name) => {
        const classExists = await invModel.checkExistingClassification(classification_name)
        if (classExists){
          throw new Error("Class already exists. Please use a different class.")
        } 
        }),
    ]
  }

  validate.checkClassRegData = async(req, res, next) => {
    const {classification_name} = req.body
    let errors = []

    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()

        res.render("../views/inventory/add-classification", {
            errors,
            message: null,
            title: "Management",
            nav,
            classification_name

        })
        return
    }
    next()
  }


// Check data for vehicle registration validation

validate.vehicleRegistrationRules = () => {
    return [
      // firstname is required and must be string
      body("inv_make")
        .trim()
        .isAlpha()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Please provide a make for the car."), // on error this message is sent.
  
      // lastname is required and must be string
      body("inv_model")
      .trim()
      .escape()
      .isAlpha()
      .isLength({ min: 3 })
        .withMessage("Please provide a model for the car."), // on error this message is sent.
  
  
      // password is required and must be strong password
      body("inv_price")
        .trim()
        .escape()
        .isDecimal()
        .isLength()
        .withMessage("Please only insert digits."),

      
      body("inv_year")
        .trim()
        .escape()
        .isNumeric()
        .isLength({ min: 4, max: 4})
        .withMessage("Please input 4 digits"),

       body("inv_miles")
        .trim()
        .escape()
        .isNumeric()
        .isLength({min:1})
        .withMessage("Please input a mileage"),

       body("inv_color")
        .trim()
        .escape()
        .isAlpha()
        .withMessage("Please input a color")
    ]
  }

validate.checkVehicleRegData = async(req, res, next) => {
    const {inv_make, inv_model,inv_price, inv_year, inv_miles, inv_color} = req.body
    let errors = []
    let select = await utilities.getVehicleRegisterSelect()


    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()

        res.render("../views/inventory/add-vehicle", {
            errors,
            message: null,
            title: "Management",
            nav,
            select: select,
            inv_make, 
            inv_model,
            inv_price, 
            inv_year, 
            inv_miles, 
            inv_color
        })
        return
    }
    next()
  }


  module.exports = validate;