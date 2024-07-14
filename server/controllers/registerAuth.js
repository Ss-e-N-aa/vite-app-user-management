const User = require("../models/user")
/* const { hashPassword } = require("../helpers/auth") */

// Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { id, role, firstName, lastName, username, email, password } = req.body;

        // check for values not be empty 
        if (!firstName || !lastName || !username || !email) {
            return res.json({
                error: 'A value is required'
            })
        };

        if (!password) {
            return res.json({
                error: "Password is required"
            })
        };

        if (password.length < 6) {
            return res.json({
                error: "Password should be at least 6 characters long"
            })
        };

        // check for unique email
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.json({
                error: 'Email is already taken'
            })
        };
        // check for unique firstname
        const firstNameExist = await User.findOne({ firstName });
        if (firstNameExist) {
            return res.json({
                error: 'First name is already taken'
            });
        }
        // check for unique lastname
        const lastNameExist = await User.findOne({ lastName });
        if (lastNameExist) {
            return res.json({
                error: 'Last name is already taken'
            });
        }

        /* const hashedPasswored = await hashPassword(password) // for bcrypt*/

        // create user in database 
        const user = await User.create({
            id,
            role,
            firstName,
            lastName,
            username,
            email,
            password
        })

        return res.json(user)

    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerUser };