/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")

/* ***********************
* View Engine and Templates
*************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")


/* ***********************
* Routes
*************************/

app.use(require("./routes/static"))


// Index Route
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", require("./routes/inventory-route"))

// Account routes
// app.use("/client", require("./routes/account-route"))


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
