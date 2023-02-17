/* ****************************************
*  Deliver login view
**************************************** */
const utilities = require("../utilities")

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("clients/login", {
      title: "Login",
      nav,
      message: null,
    })
  }
  
  module.exports = { buildLogin }