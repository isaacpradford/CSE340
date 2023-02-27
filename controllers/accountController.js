/* ****************************************
 *  Process registration request
 **************************************** */
const account_model = require("../models/account-model")
const utilities = require("../utilities")

async function registerClient(req, res) {
  let nav = await utilities.getNav()
  const { client_firstname, client_lastname, client_email, client_password } =
    req.body

  const regResult = await account_model.registerClient(
    client_firstname,
    client_lastname,
    client_email,
    client_password
  )
  console.log(regResult)
  if (regResult) {
    res.status(201).render("clients/login.ejs", {
      title: "Login",
      nav,
      message: `Congratulations, you\'re registered ${client_firstname}. Please log in.`,
      errors: null,
    })
  } else {
    const message = "Sorry, the registration failed."
    res.status(501).render("clients/register.ejs", {
      title: "Registration",
      nav,
      message,
      errors: null,
    })
  }
}


/* ****************************************
*  Deliver login view
**************************************** */

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("clients/login", {
      title: "Login",
      nav,
      message: null,
    })
  }
  

  async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("clients/register", {
    title: "Register", 
    nav, 
    message: null,
    })
  }
  

  module.exports = { buildLogin, buildRegister, registerClient};