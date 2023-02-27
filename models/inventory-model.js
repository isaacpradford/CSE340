const pool = require("../database/index")

/* ***************************
 *  Get all classification data
 * ************************** */

async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getVehiclesByClassificationId(classificationId) {
  try {
    const data = await pool.query ("SELECT * FROM public.inventory AS i JOIN public.classification AS c on i.classification_id = c.classification_id WHERE i.classification_id = $1", [classificationId])
    return data.rows
  } catch (error) {
    console.error('getClassificationById error' + error)
  }
}

async function getVehiclesByInv_id(inv_id) {
  try {
    const data = await pool.query("SELECT * FROM public.inventory WHERE inv_id = $1", [inv_id])
    return data
  } catch (error) {
    console.error("getvehiclebyinv_id" + error)
  }
}

// Management functions to add classification
async function registerNewClassification(classification_name) {
  try {
  const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"

  return await pool.query(
    sql, 
    [classification_name])
  } catch(error) {
    return error.message
  }
}

// Management function to add vehicle
async function registerNewVehicle(
  inv_make, 
  inv_model, 
  inv_year, 
  inv_description, 
  inv_image, 
  inv_thumbnail, 
  inv_price,
  inv_miles, 
  inv_color,
  classification_id)
  {
      
    try {
      const sql = `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`

      return await pool.query(sql, [
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description,
        inv_image, 
        inv_thumbnail, 
        inv_price,
        inv_miles, 
        inv_color, 
        classification_id])
    } catch(error) {
      return error.message
    }
  }


module.exports = {getClassifications, getVehiclesByClassificationId, getVehiclesByInv_id, registerNewClassification, registerNewVehicle}
