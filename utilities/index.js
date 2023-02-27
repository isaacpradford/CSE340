const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.buildNav = function (data) {
  let list = "<ul>"
  list += '<li class="navList"><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li class='navList'>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ************************
 * Builds the navigation bar
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  nav = Util.buildNav(data)
  return nav
}

/* ***************************************
* Builds the vehicle page
********************************** */

Util.getVehiclePage = async function (data) {
  let page = `
  <img src="${data.rows[0].inv_image}" alt="Image of ${data.rows[0].inv_make + "" + data.rows[0].inv_model}"></img>
  // <p>Price: $${new Intl.NumberFormat('en-US').format(data.rows[0].inv_price)}</p>
  // <p>Color: ${data.rows[0].inv_color}</p>
  // <p>Miles: ${new Intl.NumberFormat('en-US').format(data.rows[0].inv_miles)}</p>
  // <p>${data.rows[0].inv_description}</p>
  `
  return page;
}


/* ***************************************
* Builds the vehicle registration page
********************************** */

Util.buildVehicleRegisterSelection = async function (data) {
  let select = "<select name='selectList' id='selectList'>"
  data.rows.forEach((row) => {
      select += "<option value='" + row.classification_id + "' required>" + row.classification_id + " " + row.classification_name + "</option>"
  })
  select += "</select>"
  return select;
}

Util.getVehicleRegisterSelect = async function(req, res, next) {
  let data = await invModel.getClassifications()
  let select = Util.buildVehicleRegisterSelection(data)

  return select;
}
 
module.exports = Util;