
const pool = require("../database/index")

// REGISTER NEW CLIENT
async function registerClient (
    client_firstname,
    client_lastname,
    client_email,
    client_password
) {
    try {
        const sql = "INSERT INTO client (client_firstname, client_lastname, client_email, client_password, client_type) VALUES ($1, $2, $3, $4, 'client') RETURNING *"

        return await pool.query(sql, [
            client_firstname,
            client_lastname,
            client_email,
            client_password
        ])
    } catch(error) {
        return error.message
    }
}

module.exports = { registerClient };