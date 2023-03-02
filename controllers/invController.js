const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassification = async function (req,res, next) {
    const classificationId = req.params.classificationId

    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()

    const className = data[0].classification_name
    res.render("./inventory/classification-view", {
        title: className + " vehicles", 
        nav,
        message: null,
        data,
    });
}

invCont.buildByVehicle = async function (req, res, next) {

    const inventory_id = req.params.inventory_id
    let data = await invModel.getVehiclesByInv_id(inventory_id)
    let page = await utilities.getVehiclePage(data)
    let nav = await utilities.getNav()

    const className = data.rows[0].inv_year + " " + data.rows[0].inv_make + " " + data.rows[0].inv_model;
    res.render("./inventory/vehicle-detail", {
        title: className,
        nav,
        message: null,
        data
    }) 
}

// Deliver Management view
invCont.buildManagerView = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management-view", {
        title: "Management", 
        nav,
        message: null})
}

// Deliver Classification Register view
invCont.buildClassRegister = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("../views/inventory/add-classification.ejs", {
        title: "Register",
        nav, 
        message: null,
        errors: null,
    })
}

// Management function to register new classification    
invCont.registerNewClassification = async function(req, res) {
    let nav = await utilities.getNav()
    const {classification_name} = req.body
    const regResult = await invModel.registerNewClassification(classification_name)

    console.log(regResult)
    if (regResult) {
        res.status(201).render("./inventory/management-view", {
          title: "Management",
          nav,
          message: `Congratulations, you\'re registered ${classification_name}.`,
          errors: null,

        })
      } else {
        const message = "Sorry, the registration failed."
        res.status(501).render("./inventory/management-view", {
          title: "Management",
          nav,
          message,
          errors: null,
        })
    }
}




// Build the Vehicle registration view
invCont.buildVehicleRegister = async function(req, res) {
    let nav = await utilities.getNav()
    let select = await utilities.getVehicleRegisterSelect()

    res.render("../views/inventory/add-vehicle.ejs", {
        title: "Vehicle Register",
        nav,
        select: select,
        message: null,
        errors: null
    })
}

// Register new vehicle
invCont.registerNewVehicle = async function(req, res) {
    let nav = await utilities.getNav()

    const {
            inv_make, 
            inv_model, 
            inv_year, 
            inv_description,
            inv_image, 
            inv_thumbnail, 
            inv_price,
            inv_miles, 
            inv_color,
            selectList } = req.body

    const regResult = await invModel.registerNewVehicle(
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price,
        inv_miles, 
        inv_color, 
        selectList)


    if (regResult) {
        res.status(201).render("./inventory/management-view", {
          title: "Management",
          nav,
          message: `Congratulations, you\'re registered the ${inv_make} ${inv_model} ${inv_year}.`,
          errors: null,
        })
      } else {
        const message = "Sorry, the registration failed."
        res.status(501).render("./inventory/management-view", {
          title: "Management",
          nav,
          message,
          errors: null,
        })
    }
}



module.exports = invCont;