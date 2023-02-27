// body("client_firstname")



body("client_email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required.")
    .custom(async (client_email) => {
    const emailExists = await accountModel.checkExistingEmail(client_email)
    if (emailExists) {
        throw new Error("Email exists. Please login or use a different email")
    }
})