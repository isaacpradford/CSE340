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
    
    // console.log(data)

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

module.exports = invCont;